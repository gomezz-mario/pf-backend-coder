import { UserService } from "../services/users.service.js";
import { ProductService } from "../services/products.service.js";
import { CodeService } from "../services/codes.service.js";
import { createHash, isValidPassword } from "../bcrypt.js";
import { generate } from "generate-password";
import { mailer } from "../modules/mailer.js";

export const loginUser = async(request, response, next) => {
	const { email, password } = request.body;
	const user = await UserService.getUserByEmail(email);
	if(!user) return response.sendBadRequestError("El usuario no existe.");
	if(!isValidPassword(user, password)) return response.sendUnauthenticatedError("Error de contraseña.");
	const lastConnection = new Date();
	await UserService.updateUserById(user._id, {lastConnection});
	user.lastConnection = lastConnection;
	request.session.user = user;
	console.log(user)
	next();
}
export const registerUser = async(request, response, next) => {
	const userData = request.body.userData;
	const user = await UserService.getUserByEmail(userData.email);
	if(user) return response.sendBadRequestError("El usuario ya existe.");
	userData.password = createHash(userData.password);
	const result = await UserService.createUser(userData);
	if(!result) response.sendServerError("Error al registrar usuario.");
	request.session.user = result;
	next();
}
export const logoutUser = async(request, response, next) => {
	if(request.session.user){
		request.session.destroy(error => {
			if(error) return request.logger.error("Error al cerrar sesión.");
		});
		request.logger.debug("Sesión cerrada");
	}
	next();
}
export const sendRecoveryEmail = async(request, response, next) => {
	try {
		const email = request.query.email;
		if(!email) return response.sendBadRequestError("Email: null");
		const user = await UserService.getUserByEmail(email);
		if(!user) return response.sendBadRequestError("Usuario no encontrado.");
		const stringCode = generate({length:10, lowercase: true});
		const recoveryCode = await CodeService.create(stringCode);
		await UserService.updateUserById(user._id, {recoveryCode: recoveryCode._id});
		await mailer.sendEmailResetPassword(email, recoveryCode._id);
		next();	
	} catch (error) {
		response.sendServerError("Server error. Enviando email de recuperación.");
	}
}
export const sendNewPassword = async(request, response, next) => {
	try {
		const { email, code } = request.query;
		if(!email || !code) return response.sendBadRequestError("Email o Code: null");
		const user = await UserService.getUserByEmail(email);
		if(!user) return response.sendBadRequestError("El usuario no existe");
		if(!user.recoveryCode) return response.sendBadRequestError("Este usuario no solicitó un cambio de contraseña.");
		const recoveryCode = await CodeService.getById(code);
		if(!recoveryCode) return response.sendBadRequestError("Este código expiró.");
		if(code.toString() !== user.recoveryCode.toString()) return response.sendBadRequestError("El código es obsoleto.");
		request.logger.debug("Código válido.")
		await UserService.updateUserById(user._id, {recoveryCode: null, password: createHash(recoveryCode.code)});
		request.logger.debug("Contraseña restablecida correctamente.")
		await mailer.sendEmailNewPassword(email, recoveryCode.code);
		request.logger.debug("Contraseña enviada al email del usuario.")
		next();	
	} catch (error) {
		response.sendServerError("Error del servidor. Restableciendo contraseña. ", error);
	}
}
export const getUsers = async(request, response, next) => {
	const allUsers = await UserService.getUsers();
	request.body = {
		allUsers
	};
	next();
}
export const updateUser = async(request, response) => {
	const uid = request.params.uid;
	const updateData = request.body.updateData;
	const user = request.session.user;
	if(!uid) return response.sendBadRequestError("Id is null");
	if(!updateData) return response.sendBadRequestError("No update data");
	if(uid!== user._id){
		if(user.role !== "admin") return response.sendUnauthorizedError("Solo el administrador puede actualizar la cuenta de otro usuario.");
		try {
			const otherUser = await UserService.getUserById(uid);
			if(otherUser.role === "admin") return response.sendUnauthorizedError("Un administrador no puede cambiar los permisos de otro administrador.");
		} catch (error) {
			return response.sendServerError("Error al buscar datos de usuario.");
		}
	}
	try {
		const result = await UserService.updateUserById(uid, updateData);
		return response.sendSuccess(result);
	} catch (error) {
		return response.sendServerError("Error al actualizar datos del usuario.")
	}	
}
export const deleteUser = async(request, response) => {
	const uid = request.params.uid;
	const user = request.session.user;
	try {
		if(uid!== user._id){
			if(user.role !== "admin") return response.sendUnauthorizedError("Solo el administrador puede eliminar la cuenta de otro usuario.");
			const otherUser = await UserService.getUserById(uid);
			if(otherUser.role === "admin") return response.sendUnauthorizedError("Un administrador no puede eliminar la cuenta de otro administrador.");
			if(otherUser.role === "premium"){
				const products = await ProductService.getProductsByOwner(uid);
				await Promise.all(products.map(async product => await ProductService.deleteProductById(product._id)));
			}
			await mailer.sendEmailAccountDeleted(otherUser.email);	
		} else{
			await mailer.sendEmailAccountDeleted(user.email);
		}
		const result = await UserService.deleteUserById(uid);
		return response.sendSuccess(result);
	} catch (error) {
		return response.sendServerError("Error al eliminar usuario.")
	}
}
import { ProductService } from "../services/products.service.js";
import { UserService } from "../services/users.service.js";
import { mailer } from "../modules/mailer.js";

export const getProducts = async (request, response, next) => {
	const page = parseInt(request.query.page) || 1;
	const limit = parseInt(request.query.limit) || 10;
	const sort = request.query.sort || null;
	const filters = Object.entries(request.query).filter(element => element[0] !== "page" && element[0] !== "limit" && element[0] !== "sort").reduce((acum, element) => {
		acum[element[0]] = element[1];
		return acum;
	}, {});
	const result = await ProductService.getProducts(page, limit, filters, sort) 
	request.body = {
		result
	}
	return next();
}
export const getProductsByOwner = async(request, response, next) => {
	const userId = request.session.user._id;
	const result = await ProductService.getProductsByOwner(userId);
	console.log(result);
	request.body = {
		result
	}
	next();
}
export const getProductById = async(request, response, next) => {
	const id = request.params.pid;
	const result = await ProductService.getProductById(id);
	if(!result) return res.sendBadRequestError("Producto no encontrado.");
	request.body = {
		result
	}
	return next()
}
export const addProduct = async(request, response, next) => {
	const productData = request.body.productData;
	productData.owner = request.session.user._id;
	const result = await ProductService.addProduct(productData);
	request.body = {
		result
	}
	return next()
}
export const updateProductById = async(request, response, next) => {
	const user = request.session.user;
	const id = request.params.pid;
	if(!id) return response.sendBadRequestError("Id es un parámetro obligatorio");
	const product = await ProductService.getProductById(id);
	if(!product) return response.sendBadRequestError("Producto no encontrado");
	if(user._id !== product.owner) return response.sendUnauthorizedError("Solo el dueño puede actualizar el producto.");
	const productData = request.body.productData;
	if(!productData) return response.sendBadRequestError("Datos del producto no encontrado.");
	try {
		const result = await ProductService.updateProductById(id, productData);
		request.body = {
			result
		}
		return next();	
	} catch (error) {
		return response.sendServerError("Error actualizando producto.");
	}
	
}
export const deleteProductById = async(request, response, next) => {
	const user = request.session.user;
	const id = request.params.pid;
	if(!id) return response.sendBadRequestError("Id es un parámetro obligatorio");
	try {
		const product = await ProductService.getProductById(id);
		if(!product) return response.sendBadRequestError("El producto no existe");
		if(user._id !== product.owner){
			if(user.role !== "admin") return response.sendUnauthorizedError("Solo el administrador puede eliminar productos que no le pertenecen.");
			const ownerUser = await UserService.getUserById(product.owner);
			if(ownerUser.role === "admin") return response.sendUnauthorizedError("No se puede eliminar este producto porque le pertenece a otro administrador.");
			await mailer.sendEmailProductDeleted(ownerUser.email, product);
		} else{
			await mailer.sendEmailProductDeleted(user.email, product);
		}
		const result = await ProductService.deleteProductById(id);
		request.body = {
			result
		}
		return next();	
	} catch (error) {
		return response.sendServerError("Error eliminando producto.");
	}
}
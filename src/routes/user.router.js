import CustomRouter from "./custom.router.js";
import { loginUser, logoutUser, registerUser, sendRecoveryEmail, sendNewPassword, updateUser, deleteUser, getUsers } from "../controllers/users.controller.js";

class UserRouter extends CustomRouter{
	init(){
		this.post('/user-login', ["PUBLIC"], loginUser, (request, response) => {
			response.redirect("/views");
		});
		this.get('/user-logout', ["PUBLIC"], logoutUser, (request, response) => {
			response.redirect("/views");
		});
		this.post('/user-register', ["PUBLIC"], registerUser, (request, response) => {
			response.redirect("/views");
		});
		this.get('/user-recovery', ["PUBLIC"], sendRecoveryEmail, (request, response) => {
			response.redirect("/views/user-login");
		})
		this.get('/reset_password', ["PUBLIC"], sendNewPassword, (request, response) => {
			response.sendSuccess("Contraseña restablecida correctamente. Contraseña enviada a email del usuario.");
		});
		//get users
		this.get('/', ["ADMIN"], getUsers, (request, response) => {
			const allUsers = request.body.allUsers;
			response.sendSuccess(allUsers)
		});
		//actualizar datos
		this.put('/:uid', ["USER"], updateUser);
		//eliminar cuenta
		this.delete('/:uid', ["USER"], deleteUser);
	}
}

export default UserRouter;
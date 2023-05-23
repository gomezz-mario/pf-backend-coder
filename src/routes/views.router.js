import CustomRouter from "./custom.router.js";
import { getUsers } from "../controllers/users.controller.js";
import { getProducts, getProductById, addProduct, deleteProductById, updateProductById } from "../controllers/products.controller.js";
import { renderProductsGallery, renderProductDetails, renderHome, renderLogin, renderRegister, renderRecovery, renderCart, renderPublicaciones, renderNewProductPage, renderEditProductPage, renderAdminPage } from "../controllers/views.controllers.js";

class ViewsRouter extends CustomRouter{
	init(){
		this.get('/', ["PUBLIC"], renderHome);
		this.get('/categories', ["PUBLIC"], getProducts, renderProductsGallery);
		this.get('/product-details/:pid', ["PUBLIC"], getProductById, renderProductDetails);
		this.get('/cart', ["USER"], renderCart);
		this.get('/user-login', ["PUBLIC"], renderLogin);
		this.get('/user-register', ["PUBLIC"], renderRegister);
		this.get('/user-recovery', ["PUBLIC"], renderRecovery);
		this.get('/my-products', ["PREMIUM"], renderPublicaciones);
		this.get('/my-products/new-product', ["PREMIUM"], renderNewProductPage);
		this.get('/my-products/edit/:pid', ["PREMIUM"], renderEditProductPage);
		this.get('/admin', ["ADMIN"], getUsers, async(request, response, next) => {
			const users = request.body.allUsers;
			const myId = request.session.user._id;
			const ahora = new Date();
			const allUsers = users.filter(user => user._id !== myId && user.role !== "admin").map(user => {
				const dias = parseInt((ahora - user.lastConnection)/(1000*60*60*24));
				const horas = parseInt((ahora - user.lastConnection)/(1000*60*60)) - dias*24;
				const minutos = parseInt((ahora - user.lastConnection)/(1000*60)) - dias*24*60 - horas*60;
				user.lastConnection = `${dias}d : ${horas}h : ${minutos}m`;
				user.inactive = minutos > 5;
				return user;
			}); 
			request.body = {
				allUsers
			}
			next();
		}, renderAdminPage);

	}
}

export default ViewsRouter;
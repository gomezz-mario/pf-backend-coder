import { CartService } from "../services/carts.service.js";
import { UserService } from "../services/users.service.js";
import { TicketsService } from "../services/tickets.service.js";
import { ProductService } from "../services/products.service.js";
import { mailer } from "../modules/mailer.js";

export const getCart = async(request, response) => {
	try {
		const id = request.params.cid;
		const cart = await CartService.getCart(id);
		return response.sendSuccess(cart);
	} catch (error) {
		request.logger.error(error)
		return response.sendServerError("Error buscando carrito.");
	}
}
export const addProductsToCart = async(request, response) => {
	const user = request.session.user;
	const products = request.body.products || [];
	if(!user.cart){
		try {
			const newCart = await CartService.createCart();
			await UserService.updateUserById(user._id, {cart: newCart._id});
			user.cart = newCart._id;
			request.session.user.cart = newCart._id;
		} catch (error) {
			request.logger.error(error)
			return response.sendServerError("Error al crear carrito.");
		}
	}
	try {
		const cartId = user.cart;
		await CartService.addProductsToCart(cartId, products);
		const cart = await CartService.getCart(cartId);
		return response.sendSuccess(cart);	
	}
	catch (error) {
		request.logger.error(error)
		return response.sendServerError("Error al agregar productos al carrito.");
	}
}
export const updateProductsToCart = async(request, response) => {
	try {
		const id = request.params.cid;
		const products = request.body.products;
		await CartService.updateProductsToCart(id, products);
		const cart = await CartService.getCart(id);
		return response.sendSuccess(cart);	
	} catch (error) {
		return response.sendServerError("Error al actualizar el carrito.");
	}
}
export const deleteCart = async(request, response) => {
	try {
		const id = request.params.cid;
		await CartService.deleteCart(id);
		const cart = await CartService.getCart(id);
		return response.sendSuccess(!cart);	
	} catch (error) {
		request.logger.error(error)
		return response.sendServerError("Error al eliminar el carrito.");
	}
}
export const deleteProductsToCart = async(request, response) => {
	try {
		const id = request.session.user.cart;
		const products = request.body.products;
		await CartService.deleteProductsToCart(id, products);
		const cart = await CartService.getCart(id);
		return response.sendSuccess(cart);	
	} catch (error) {
		request.logger.error(error)
		return response.sendServerError("Error al eliminar los productos del carrito.");
	}
	
}
export const deleteAllProductsToCart = async(request, response) => {
	try {
		const id = request.params.cid;
		await CartService.deleteAllProductsToCart(id);
		const cart = await CartService.getCart(id);
		return response.sendSuccess(cart);	
	} catch (error) {
		request.logger.error(error)
		return response.sendServerError("Error al vaciar el carrito.");
	}
	
}
export const purchaseCart = async(request, response) => {
	const user = request.session.user;
	if(!user.cart) return response.sendBadRequestError("Carrito no encontrado 1.");
	try {
		const cart = await CartService.getCart(user.cart);
		if(!cart) return response.sendBadRequestError("Carrito no encontrado. ", user.cart);
		const products = await Promise.all(cart.products.map(async product => {
			const productData = await ProductService.getProductById(product._id);
			return {
				...productData,
				quantity: product.quantity
			}
		}));
		const amount = products.reduce((previus, current) => previus + current.quantity*current.price, 0);
		const ticket = await TicketsService.createTicket(user, products, amount);
		await CartService.deleteCart(user.cart);
		request.session.user.cart = null;
		await mailer.sendEmailPurchaseCart(user.email, ticket);
		response.sendSuccess(ticket);
	} catch (error) {
		response.sendServerError("Error comprando carrito.")
	}
}
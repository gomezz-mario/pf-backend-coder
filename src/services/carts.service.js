import { Cart } from "../dao/factory.js";

class CartRepository{
	constructor(cartDao){
		this.cartDao = cartDao;
	}
	createCart = async() => {
		return await this.cartDao.createCart();
	};
	getCart = async(id) => {
		return await this.cartDao.getCart(id);
	};
	addProductsToCart = async(id, products) => {
		return await this.cartDao.addProductsToCart(id, products);
	};
	updateProductsToCart = async(id, products) => {
		return await this.cartDao.updateProductsToCart(id, products);
	};
	deleteProductsToCart = async(id, productsId) => {
		return await this.cartDao.deleteProductsToCart(id, productsId);
	};
	deleteAllProductsToCart = async(id) => {
		return await this.cartDao.deleteAllProductsToCart(id)
	};
	deleteCart = async(id) => {
		return await this.cartDao.deleteCart(id);
	};
}

export const CartService = new CartRepository(new Cart());
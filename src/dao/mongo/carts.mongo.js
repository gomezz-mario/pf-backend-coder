import Connect from "./connect.mongo.js";
import CartModel from "./models/cart.model.js";


class Cart{
	constructor(){
		Connect.getInstance();
	};
	createCart = async() => {
		return await CartModel.create({products: []});
	};
	getCart = async(id) => {
		return await CartModel.findById(id);
		
	};
	addProductsToCart = async(id, products) => {
		const cart = await this.getCart(id);
		const productsInCart = cart.products;
		products.map(product => {	
			let productInCart = productsInCart.find(prod => prod._id.toString() === product._id);
			if(productInCart){
				productInCart.quantity += product.quantity;
			} else{
				productsInCart.push(product);
			}
		});
		return await CartModel.findByIdAndUpdate(id, {products: productsInCart});
	};
	updateProductsToCart = async(id, products) => {
		const cart = await this.getCart(id);
		const productsInCart = cart.products;
		products.map(product => {	
			let productInCart = productsInCart.find(prod => prod._id.toString() === product._id);
			if(productInCart){
				productInCart.quantity = product.quantity;
			} else{
				productsInCart.push(product);
			}
		});
		return await CartModel.findByIdAndUpdate(id, {products: productsInCart});
	};
	deleteProductsToCart = async(id, productsId) => {
		const cart = await this.getCart(id);
		let productsInCart = cart.products;
		productsId.map(productId => {
			productsInCart = productsInCart.filter(product => product._id.toString() !== productId);
		});
		return await CartModel.findByIdAndUpdate(id, {products: productsInCart});
	};
	deleteAllProductsToCart = async(id) => {
		await CartModel.findByIdAndUpdate(id, {products: []});
	};
	deleteCart = async(id) => {
		return await CartModel.findByIdAndDelete(id);
	};
}

export default Cart;
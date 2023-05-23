import FileManager from "./file_maganger.js";

class Cart{
	constructor(){
		this.fileManager = new FileManager('./db/carts.json');
	};
	createCart = async() => {
		return await this.fileManager.add({products: []});
	};
	getCart = async(id) => {
		return await this.fileManager.getById(id);
	};
	addProductsToCart = async(id, products) => {
		const cart = await this.getCart(id);
		const productsInCart = cart.products;
		products.map(product => {
			let productInCart = productsInCart.find(prod => prod._id === product._id);
			if(productInCart){
				productInCart.quantity += product.quantity;
			} else{
				productInCart.push(product)
			}
		});
		return await this.fileManager.update(id, {products: productsInCart});
	};
	updateProductsToCart = async(id) => {
		const cart = await this.getCart(id);
		const productsInCart = cart.products;
		products.map(product => {
			let productInCart = productsInCart.find(prod => prod._id === product._id);
			if(productInCart){
				productInCart.quantity = product.quantity;
			} else{
				productsInCart.push(product);
			}
		});
		return await this.fileManager.update(id, {products: productsInCart});
	};
	deleteProductsToCart = async(id, productsId) => {
		const cart = await this.getCart(id);
		let productsInCart = cart.products;
		productsId.map(productId => {
			productsInCart = productsInCart.filter(productInCart => productInCart._id !== productId);
		});
		return await this.fileManager.update(id, {products: productsInCart});
	};
	deleteAllProductsToCart = async(id) => {
		return await this.fileManager.update(id, {products: []});
	};
	deleteCart = async(id) => {
		return await this.fileManager.delete(id);
	};
}

export default Cart;
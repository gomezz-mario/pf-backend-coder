import MemoryManager from "./memory_manager.js";

class Cart{
	constructor(){
		this.memoryManager = new MemoryManager();
	};
	createCart = async() => {
		return await this.memoryManager.add({products: []});
	};
	getCart = async(id) => {
		return await this.memoryManager.getById(id);
	};
	addProductsToCart = async(id, products) => {
		const cart = await this.getCart(id);
		const productsInCart = cart.products;
		products.map(product => {
			let productInCart = productsInCart.find(prod => prod._id === product._id);
			if(productInCart){
				productInCart.quantity += product.quantity;
			} else{
				productsInCart.push(product);
			}
		});
		return await this.memoryManager.update(id, {products: productsInCart});
	};
	updateProductsToCart = async(id, products) => {
		const cart = await this.getCart(id);
		const productsInCart = cart.products;
		products.map(product => {
			let productInCart = productsInCart.find(prod => prod._id === product._id);
			if(productInCart){
				productInCart.quantity = product.quantity;
			} else{
				productInCart.push(product);
			}
		});
		return await this.memoryManager.update(id, {products: productsInCart});
	};
	deleteProductsToCart = async(id, productsId) => {
		const cart = await this.getCart(id);
		let productsInCart = cart.products;
		productsId.map(productId => {
			productsInCart = productsInCart.filter(productInCart => productInCart._id !== productId);
		});
		return await this.memoryManager.update(id, {products: productsInCart});
	};
	deleteAllProductsToCart = async(id) => {
		return await this.memoryManager.update(id, {products: []});
	};
	deleteCart = async(id) => {
		return await this.memoryManager.delete(id);
	};
}

export default Cart;
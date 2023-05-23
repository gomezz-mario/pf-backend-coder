import CustomRouter from "./custom.router.js";
import { getCart, addProductsToCart, updateProductsToCart, deleteProductsToCart, deleteAllProductsToCart, deleteCart, purchaseCart } from "../controllers/carts.controller.js";

class CartRouter extends CustomRouter{
	init(){
		this.get('/', ["USER"], getCart);
		this.put('/add', ["USER"], addProductsToCart);
		this.put('/update', ["USER"], updateProductsToCart);
		this.put('/delete-products', ["USER"], deleteProductsToCart);
		this.put('/delete-all-products', ["USER"], deleteAllProductsToCart);
		this.delete('/', ["USER"], deleteCart);
		this.post('/purchase', ["USER"], purchaseCart);
	}
}

export default CartRouter;
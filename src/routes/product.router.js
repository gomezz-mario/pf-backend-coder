import CustomRouter from "./custom.router.js";
import { getProducts, getProductById, getProductsByOwner, addProduct, deleteProductById, updateProductById } from "../controllers/products.controller.js";

class ProductRouter extends CustomRouter{
	init(){
		this.get('/', ["PUBLIC"], getProducts, async(request, response) => {
			if(!request.body.result) return response.sendServerError("Error al consultar productos.");
			response.sendSuccess(request.body.result)
		});
		this.get('/byowner', ["PREMIUM", "ADMIN"], getProductsByOwner, async(request, response) => {
			if(!request.body.result) return response.sendServerError("Error al consultar productos.");
			response.sendSuccess(request.body.result)
		});
		this.post('/', ["PREMIUM"], addProduct, async(request, response) => {
			if(!request.body.result) return response.sendServerError("Error al crear un producto.");
			response.sendSuccess(request.body.result)
		});
		this.get('/:pid', ["PUBLIC"], getProductById, async(request, response) => {
			if(!request.body.result) return response.sendServerError("Error al consultar un producto.");
			response.sendSuccess(request.body.result)
		});
		this.put('/:pid', ["PREMIUM"], updateProductById, async(request, response) => {
			if(!request.body.result) return response.sendServerError("Error al actualizar datos de un producto.");
			response.sendSuccess(request.body.result)
		});
		this.delete('/:pid', ["PREMIUM"], deleteProductById, async(request, response) => {
			if(!request.body.result) return response.sendServerError("Error al eliminar un producto.");
			response.sendSuccess(request.body.result)
		});
	}
}

export default ProductRouter;
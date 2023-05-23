import ProductModel from "./models/product.model.js";
import ConnectMongo from "./connect.mongo.js";

class Product{
	constructor(){
		ConnectMongo.getInstance();
	}
    getProducts = async(page, limit, filters, sort) => {
		let results;
		if(sort){
			switch(sort){
					case "mayor_precio":
						results = await ProductModel.paginate(filters, { page, limit, lean: true, sort: { price: 'desc'} });
						break;
					case "menor_precio":
						results = await ProductModel.paginate(filters, { page, limit, lean: true, sort: { price: 'asc'} });
						break;
					case "mayor_descuento":
						results = await ProductModel.paginate(filters, { page, limit, lean: true, sort: { discount_percent: 'desc'} });
						break;
				default:
					results = await ProductModel.paginate(filters, { page, limit, lean: true });
					break;
			}
		} else{
			results = await ProductModel.paginate(filters, { page, limit, lean: true });
		}

		return {
			pagination: {
				page: results.page,
				totalPages: results.totalPages,
				limit,
				filters,
				sort
			},
			products: results.docs
		}
	}

	getProductsByOwner = async(ownerId) => {
		const result = await ProductModel.find({owner: ownerId});
		const products = result.map(product => product._doc);
		console.log({products});
		return products;
	}

	addProduct = async(productData) => {
		return await ProductModel.create(productData);
	}

    getProductById = async(id) => {
		const result = await ProductModel.findById(id);
		return result._doc;
	}

    updateProductById = async(id, productData) => {
		return await ProductModel.findByIdAndUpdate(id, productData)
	}

    deleteProductById = async(id) => {
		return await ProductModel.findByIdAndDelete(id);
	}
}

export default Product;
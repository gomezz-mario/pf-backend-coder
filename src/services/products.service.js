import { Product } from "../dao/factory.js";
import ProductDTO from "../dao/dto/product.dto.js";

class ProductRepository{
	constructor(productDao){
		this.productDao = productDao;
	}

	getProducts = async(page, limit, filters, sortMethod) => {
        return await this.productDao.getProducts(page, limit, filters, sortMethod);
    }
    getProductsByOwner = async(ownerId) => {
        return await this.productDao.getProductsByOwner(ownerId);
    }
	addProduct = async(productData) => {
        const productDataToInsert = new ProductDTO(productData);
        console.log("productDTO: ", productDataToInsert)
		return await this.productDao.addProduct(productDataToInsert);
    }

    getProductById = async(id) => {
        return await this.productDao.getProductById(id);
    }

    updateProductById = async(id, productData) => {
        return await this.productDao.updateProductById(id, productData);
    }

    deleteProductById = async(id) => {
        return await this.productDao.deleteProductById(id);
    }
	
}

export const ProductService = new ProductRepository(new Product());

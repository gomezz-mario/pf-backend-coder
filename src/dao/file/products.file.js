import FileManager from "./file_maganger.js";

class Product{
	constructor(){
		this.fileManager = new FileManager('./db/products.json');
	}

    getProducts = async(page, limit, filters, sort) => {
        const params = Object.entries(filters).map(element => {
            let a = {};
            a[element[0]] = element[1];
            return a;
        })
        let results = await this.fileManager.getByParams(params);
        if(sort){
            switch(sort){
                case "mayor_precio":
                    results = results.sort((a, b) => b.price - a.price); 
                    break;
                case "menor_precio": 
                    results = results.sort((a, b) => a.price - b.price);
                    break;
                case "mayor_descuento":
                    results = results.sort((a, b) => b.discount_percent - a.discount_percent); 
                    break;
                default: break;
            }
        }
        const totalDocs = results.length;
        let totalPages = 0;
        if(totalDocs <= limit){
            totalPages = 1;
        } else{
            totalPages = Math.floor(totalDocs/limit) + 1;
        }
        let rPage = parseInt(page);
        if(totalDocs < limit){
            rPage = 1;
        } else{
            if(rPage > totalPages){
                rPage = totalPages;
            }
        }

        return {
            products: results.slice((parseInt(page)-1)*limit, parseInt(page)*limit),
            pagination: {
                page: rPage,
                totalPages,
                limit,
                filters,
                sort
            }
        }
    }

    getProductsByOwner = async(ownerId) => {}
    
    addProduct = async(productData) => {
        return await this.fileManager.add(productData);
    }

    getProductById = async(id) => {
        return await this.fileManager.getById(id);
    }

    updateProductById = async(id, productData) => {
        return await this.fileManager.update(id, productData);
    }

    deleteProductById = async(id) => {
        return await this.fileManager.delete(id);
    }
}

export default Product;

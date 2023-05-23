export default class ProductDTO{
	
	constructor(product){
		this.title = product.title || "";
		this.description = product.description || "";
		this.category = product.category || "";
 		this.code = product.code;
  		this.price = product.price || 0;
		this.discount_percent = product.discount_percent || 0;
		this.old_price = product.discount_percent ? parseInt(product.price * (1 + product.discount_percent/100)) : product.price;
  		this.status = product.status || false;
  		this.stock = product.stock || 0;
  		this.thumbnails = product.thumbnails || [];
		this.owner = product.owner || "admin";
		this.cuotas = product.cuotas || 0;
		this.envio = product.shipping ? "envio_gratis" : null;


		switch(this.cuotas){
			case 3:
				this.paymentMethod = "tres_cuotas_sin_interes";
				break;
			case 6:
				this.paymentMethod = "seis_cuotas_sin_interes";
				break;
			case 12:
				this.paymentMethod = "doce_cuotas_sin_interes";
				break;
			case 24:
				this.paymentMethod = "ahora_24";
				break;
			default: 
				this.paymentMethod = null;
				break;
		}
	}
}
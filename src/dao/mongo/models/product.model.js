import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const schema = mongoose.Schema(
	{
		title: String,
  		description: String,
		category: String,
 		code: String,
  		price: Number,
		discount_percent: Number,
		old_price: Number,
  		status: Boolean,
  		stock: Number,
  		thumbnails: Array,
		owner: String,
		cuotas: Number,
		envio: String,
		paymentMethod: String
	}
);

schema.plugin(mongoosePaginate);

export default mongoose.model("products", schema);

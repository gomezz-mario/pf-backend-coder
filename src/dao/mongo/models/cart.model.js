import mongoose from "mongoose";

const CartSchema = mongoose.Schema({
	products : [
		{
			_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'products',
			},
			quantity: {
				type: Number,
				default: 1
			}
		}
	]
});

//esto no me anda
CartSchema.pre('find', function () {
	this.populate('products._id');
});

export default mongoose.model("carts", CartSchema);
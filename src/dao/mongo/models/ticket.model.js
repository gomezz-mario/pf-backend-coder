import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
	purchaser: String,
	products: Array,
	amount: Number,
}, {
	timestamps: { 
		createdAt: 'purchase_datatime', 
		updatedAt: false 
	}});

export default mongoose.model("tickets", ticketSchema);
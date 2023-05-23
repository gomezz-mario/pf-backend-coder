import mongoose from "mongoose";

const schema = mongoose.Schema({
	firstName: String,
	lastName: String,
	fullName: String,
	birthday: Date,
	address: String,
	phone: String,
	email: {
		type: String,
		unique: true
	},
	password: String,
	role: String,
	social: String,
	recoveryCode: mongoose.Schema.Types.ObjectId,
	cart: mongoose.Schema.Types.ObjectId,
	lastConnection: Date
});

export default mongoose.model("users", schema);
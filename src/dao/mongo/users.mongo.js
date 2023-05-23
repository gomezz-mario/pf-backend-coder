import ConnectMongo from "./connect.mongo.js";
import UserModel from "./models/user.model.js";

class User{
	constructor(){
		ConnectMongo.getInstance();
	}
	createUser = async (userData) => {
		return await UserModel.create(userData);
	};
	getUsers = async() => {
		const result = await UserModel.find({});
		const data = result.map(user => user._doc);
		return data
	}
	getUserById = async (userId) => {
		const result = await UserModel.findById(userId);
		if(result) return result._doc;
		return result;
	};
	getUserByEmail = async (userEmail) => {
		const result = await UserModel.findOne({email: userEmail});
		if(result) return result._doc;
		return result;
	};
	updateUserById = async (userId, userData) => {
		return await UserModel.findByIdAndUpdate(userId, userData);
	};
	updateUserByEmail = async (userEmail, userData) => {
		const user = await this.getUserByEmail(userEmail);
		if(!user) return null;
		return await UserModel.findByIdAndUpdate(user._id, userData);
	};
	deleteUserById = async (userId) => {
		return await UserModel.findByIdAndDelete(userId);
	};
	deleteUserByEmail = async (userEmail) => {
		const user = await this.getUserByEmail(userEmail);
		if(!user) return null;
		return await UserModel.findByIdAndDelete(user._id);
	};
}

export default User;
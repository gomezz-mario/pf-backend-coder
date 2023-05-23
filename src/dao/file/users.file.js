import FileManager from "./file_maganger.js";

class User{
	constructor(){
		this.fileManager = new FileManager('./db/users.json');
	}
	createUser = async (userData) => {
		return await this.fileManager.add(userData);
	};
	getUserById = async (userId) => {
		return await this.fileManager.getById(userId);
	};
	getUserByEmail = async (userEmail) => {
		return await this.fileManager.getOneByParam("email", userEmail);
	};
	updateUserById = async (userId, userData) => {
		return await this.fileManager.update(userId, userData);
	};
	updateUserByEmail = async (userEmail, userData) => {
		const user = this.getUserByEmail(userEmail);
		if(!user) return user;
		return await this.updateUserById(user._id);
	};
	deleteUserById = async (userId) => {
		return await this.fileManager.delete(userId);
	};
	deleteUserByEmail = async (userEmail) => {
		const user = this.getUserByEmail(userEmail);
		if(!user) return user;
		return await this.fileManager.delete(user._id);
	};
}

export default User;
 
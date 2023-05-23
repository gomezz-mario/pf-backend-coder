import MemoryManager from "./memory_manager.js";

class User{
	constructor(){
		this.memoryManager = new MemoryManager();
	}
	createUser = async (userData) => {
		return await this.memoryManager.add(userData);
	};
	getUserById = async (userId) => {
		return await this.memoryManager.getById(userId);
	};
	getUserByEmail = async (userEmail) => {
		return await this.memoryManager.getByParams("email", userEmail);
	};
	updateUserById = async (userId, userData) => {
		return await this.memoryManager.update(userId, userData);
	};
	updateUserByEmail = async (userEmail, userData) => {
		const user = await this.getUserByEmail(userEmail);
		if(!user) return user;
		return await this.updateUserById(user._id, userData);
	};
	deleteUserById = async (userId) => {
		return await this.memoryManager.delete(userId);
	};
	deleteUserByEmail = async (userEmail) => {
		const user = await this.getUserByEmail(userEmail);
		if(!user) return user;
		return await this.deleteUserById(user._id);
	};
}

export default User;

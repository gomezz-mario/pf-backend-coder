import { User } from "../dao/factory.js";
import UserDTO from "../dao/dto/user.dto.js";

class UserRepository{
	constructor(userDao){
		this.userDao = userDao;
	}
	createUser = async (userData) => {
		const dataToInsert = new UserDTO(userData);
		return await this.userDao.createUser(dataToInsert);
	};
	getUsers = async() => {
		return await this.userDao.getUsers();
	}
	getUserById = async (userId) => {
		return await this.userDao.getUserById(userId);
	};
	getUserByEmail = async (userEmail) => {
		return await this.userDao.getUserByEmail(userEmail);
	};
	updateUserById = async (userId, userData) => {
		return await this.userDao.updateUserById(userId, userData);
	};
	updateUserByEmail = async (userEmail, userData) => {
		return await this.userDao.updateUserByEmail(userEmail, userData);
	};
	deleteUserById = async (userId) => {
		return await this.userDao.deleteUserById(userId);
	};
	deleteUserByEmail = async (userEmail) => {
		return await this.userDao.deleteUserByEmail(userEmail);
	};
}

export const UserService = new UserRepository(new User()); 
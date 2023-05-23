import CodeModel from "./models/code.model.js";
import Connect from "./connect.mongo.js";

class RecoveryCode{
	constructor(){
		Connect.getInstance();
	}
	create = async(code) => {
		return await CodeModel.create({code});
	}
	getById = async(id) => {
		return await CodeModel.findById(id);
	}
}

export default RecoveryCode;
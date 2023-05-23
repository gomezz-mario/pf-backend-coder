import mongoose from "mongoose";
import { mongoUrl } from "../../config.js";
import { logger } from "../../logger.js";

class ConnectMongo{
	static #instance;
	constructor(){
		mongoose.connect(mongoUrl, {useUnifiedTopology: true, useNewUrlParser: true});
	};
	static getInstance = () => {
		if(this.#instance){
			logger.debug("Already connected!")
			return this.#instance;
		}
		logger.debug("Mongo connected!")
		this.#instance = new ConnectMongo();
		return this.#instance;
	}
}

export default ConnectMongo;
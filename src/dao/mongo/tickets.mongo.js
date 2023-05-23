import TicketModel from "./models/ticket.model.js";
import Connect from "./connect.mongo.js";

class TicketMongo{
	constructor(){
		Connect.getInstance();
	}

	createTicket = async (purchaser, products, amount) => {
		return await TicketModel.create({
			purchaser,
			products,
			amount
		})
	}

}

export default TicketMongo;
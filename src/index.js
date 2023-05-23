import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import { engine } from "express-handlebars";
import path from "path";
import { __dirname } from "./dirname.js";
import { port, dbName, mongoUrl, secretSessionKey } from "./config.js";
import { addLogger, logger } from "./logger.js";
import { productRouter, viewsRouter, userRouter, cartRouter } from "./routes/index.routers.js";

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//Estructura Código Handlebars
app.set("view engine", "handlebars");
app.engine('handlebars', engine());
app.set("views", path.resolve(__dirname + "/views"));
//Archivos Staticos
app.use(express.static(__dirname + "/public"));
//Express sessions
app.use(session({
	store: MongoStore.create({
		mongoUrl,
		dbName,
		mongoOptions: {
			useNewUrlParser: true,
			useUnifiedTopology: true	
		},
		ttl: 3000
	}),
	secret: secretSessionKey,
	resave: true,
	saveUninitialized: true
}));
//Middlewares
app.use(addLogger);
app.use('/api/products', productRouter.getRouter());
app.use('/views/', viewsRouter.getRouter());
app.use('/api/users', userRouter.getRouter());
app.use('/api/carts', cartRouter.getRouter());

app.listen(port, logger.info(`Server listening in port ${port}`));
import ProductRouter from "./product.router.js";
import ViewsRouter from "./views.router.js";
import UserRouter from "./user.router.js";
import CartRouter from "./cart.router.js";
export const productRouter = new ProductRouter();
export const viewsRouter = new ViewsRouter();
export const userRouter = new UserRouter();
export const cartRouter = new CartRouter();
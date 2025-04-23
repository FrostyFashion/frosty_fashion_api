import { Router } from "express";
import productRouter from "./products.js";
import reviewRouter from "./review.js";
import userRouter from "./user.js";
import cartRouter from "./cart.js"

const routes = Router();

routes.use(productRouter);
routes.use(reviewRouter);
routes.use(userRouter);
routes.use(cartRouter);

export default routes;
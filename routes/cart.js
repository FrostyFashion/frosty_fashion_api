import { Router } from "express";
import { addCart, deleteCart, getCart, updateCart } from "../controllers/cart.js";
import { isAuthenticated } from "../middlewares/auth.js";

const cartRoute = Router();

cartRoute.post("/cart/:id",isAuthenticated,addCart);
cartRoute.get("/cart",isAuthenticated, getCart);
cartRoute.put("/cart/:id",isAuthenticated, updateCart);
cartRoute.delete("/cart/:id",isAuthenticated, deleteCart);

export default cartRoute;
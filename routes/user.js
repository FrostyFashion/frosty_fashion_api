import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.js";

// Create user router
const userRouter = Router();

// Define route
userRouter.post("/users/register", registerUser);

userRouter.post("/users/login", loginUser);

export default userRouter;
import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.js";

// Create user router
const userRouter = Router();

// Define route
userRouter.post("/auth/register", registerUser);

userRouter.post("/auth/login", loginUser);

export default userRouter;
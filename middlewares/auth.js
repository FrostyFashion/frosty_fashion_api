// import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import { UserModel } from "../models/user.js";

export const isAuthenticated = expressjwt({
  secret: process.env.JWT_SECRET_KEY,
  algorithms: ["HS256"],
});

export const isAuthorized = (roles) => {
  return async (req, res, next) => {
    // Find user by id
    const user = await UserModel.findById(req.auth.id);
    // Check if roles includes user role
    if (roles?.includes(user.role)) {
      next();
    } else {
      res.status(403).json("You are not authorized");
    }
  };
};

import { Router } from "express";
import { createReview, getReviews } from "../controllers/review.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

const reviewRouter = Router();

reviewRouter.post(
  "/products/:productId/reviews",
  isAuthenticated,
  createReview
);

reviewRouter.get("/products/:productId/reviews", getReviews);

export default reviewRouter;

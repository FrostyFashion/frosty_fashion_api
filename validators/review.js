import Joi from "joi";

export const reviewValidator = Joi.object({
  rating: Joi.number().required().min(1).max(5),
  comment: Joi.string().optional(),
});
import Joi from "joi";

export const addProductValidator = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  // image: Joi.string().required(),
  quantity: Joi.number().required(),
  pictures: Joi.array().items(Joi.string().required()),
});

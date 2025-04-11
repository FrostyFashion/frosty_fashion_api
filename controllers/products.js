import { ProductModel } from "../models/products.js";
import { addProductValidator } from "../validators/products.js";

export const addProduct = async (req, res, next) => {
    // Validate incoming req from body
  const { error, value } = addProductValidator.validate({
    ...req.body,
    image: req.file?.filename,
  });

  if (error) {
    return res.status(422).json(error);
  }

  // Create a product and save in database.
  const product = await ProductModel.create(value);

  res.status(201).json(product);
};

export const getProducts = (req, res) => {
  const products = ProductModel.find();

  return res.status(200).json(products);
};

export const getProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const product = await ProductModel.findById(productId);

    if (product) {
      return res.status(200).json(product);
    }

    return res.status(400).json("Product not found.");
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const product = await ProductModel.findByIdAndUpdate(productId, req.body, {
      new: true,
    });

    if (product) {
      return res.status(200).json("Product successfully updated.");
    }

    return res.status(400).json("Product not found.");
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;

  const product = await ProductModel.findByIdAndDelete(productId);

  if (product) {
    return res.status(200).json("Product successfully deleted.");
  }

  return res.status(403).json("Product not found");
};

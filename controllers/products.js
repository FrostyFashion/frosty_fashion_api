import { ProductModel } from "../models/products.js";


export const addProduct = (req,res,next) => {
    
}
export const getProducts = (req, res) => {
  const products = ProductModel.find();

  return res.status(200).json(products);
};

export const getProduct = (req, res, next) => {
  try {
    const productId = req.params.id;

    const product = ProductModel.findById(productId);

    if (product) {
      return res.status(200).json(product);
    }

    return res.status(400).json("Product not found.");
  } catch (error) {
    next(error);
  }
};

export const updateProduct = (req, res, next) => {
  try {
    const productId = req.params.id;
  
    const product = ProductModel.findByIdAndUpdate(productId, req.body, {
      new: true,
    });
  
    if(product)
    {
      return res.status(200).json('Product successfully updated.')
    }
  
    return res.status(400).json('Product not found.');
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = (req,res, next) => {
    const productId = req.params.id;

    const product = ProductModel.findByIdAndDelete(productId);

    if(product)
    {
        return res.status(200).json('Product successfully deleted.');
    }

    return res.status(403).json('Product not found');
}

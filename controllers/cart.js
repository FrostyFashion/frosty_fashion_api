import mongoose from "mongoose";
import { CartModel } from "../models/cart.js";
import { ProductModel } from "../models/products.js";
import { populate } from "dotenv";

// Calculate totalPrice
const calculateTotalPrice = (items, products) => {
  return items.reduce((total, item) => {
    const product = products.find((p) => p.id.toString() === item.productId.toString());
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
};

// Add item to cart
export const addCart = async(req,res) => {
    const productId = req.params.id;
    const {quantity = 1} = req.body;

    try{
        // Validate productId
        if(!mongoose.Types.ObjectId.isValid(productId)){
            return res.status(400).json({error: 'Invalid product ID'});
        }

        // Check if product exists
        const product = await ProductModel.findById(productId);
        if(!product) return res.status(404).json({error: 'Product not found'});

        // Check if cart exists
        let cart = await CartModel.findOne({userId: req.auth.id});
        if(!cart){
            // Create new cart
            cart = await CartModel.create({
                userId: req.auth.id,
                items: [{productId, quantity}],
                updatedAt: Date.now()
                
            })
        }else{
          // Update existing cart
          const itemIndex = cart.items.findIndex((item) =>
            item.productId.equals(productId)
          );
          if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
          } else {
            cart.items.push({ productId, quantity });
          }
          // Calculate totalPrice
          const products = await ProductModel.find({
            _id: { $in: cart.items.map((item) => item.productId) },
          });

          cart.totalPrice = calculateTotalPrice(cart.items, products);
          cart.updatedAt = Date.now();
          await cart.save();
        }

        // Populate product details for response
        const populateCart = await CartModel.findById(cart.id).populate('items.productId');

        // res.json(populatedCart);
        // console.log(populatedCart);

        const formattedItems = populateCart.items.map((item) => ({
          //   productId: item.productId._id,
          product: item.productId, // this is now the populated product object
          quantity: item.quantity,
        }));

        res.json(formattedItems);
        
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({error: 'Server error'});
    }
}

// Get cart
export const getCart = async(req,res)=> {
    try {
        // const cart =  await CartModel.findOne({userId: req.auth.id});

        const populateCart = await CartModel.findOne({ userId: req.auth.id }).populate('items.productId');
    
        if(!populateCart) return res.status(404).json({error: 'Cart not found'});

        const formattedItems = populateCart.items.map((item) => ({
            //   productId: item.productId._id,
            product: item.productId, // this is now the populated product object
            quantity: item.quantity,
        }));
        
        const totalPrice = populateCart.items.reduce((acc, item) => {
          const price = item?.productId?.price || 0;
          const quantity = item?.quantity || 0;
          return acc + price * quantity;
        }, 0);

        return res.status(200).json({
            items: formattedItems,
            totalPrice,
            updatedAt: populateCart.updatedAt

        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error'});
    }

}

// Update cart item quantity or remove
export const updateCart = async(req,res) => {
    try {
      const productId = req.params.id;

      const { quantity } = req.body;

      if (!mongoose.Types.ObjectId.isValid(productId))
        return res.status(400).json({ error: "Invalid product ID" });

      const cart = await CartModel.findOne({ userId: req.auth.id });
      if (!cart) return res.status(404).json({ error: "Cart not found." });

      const itemIndex = cart.items.findIndex((item) =>
        item.productId.equals(productId)
      );
      if (itemIndex === -1)
        return res.status(404).json({ error: "Item not found in cart" });

      if (quantity <= 0) {
        // Remove item
        cart.items.splice(itemIndex, 1);
      } else {
        // Update quantity
        cart.items[itemIndex].quantity = quantity;
      }

      // Calculate totalPrice
      const products = await ProductModel.find({
        _id: { $in: cart.items.map((item) => item.product) },
      });
      cart.totalPrice = calculateTotalPrice(cart.items, products);

      cart.updatedAt = Date.now();
      await cart.save();

      const populatedCart = await CartModel.findById(cart.id).populate(
        "items.productId"
      );
      res.json('Cart successfully updated!');
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error.'});
    }
}

// Remove item from cart
export const deleteCart = async (req, res) => {
  try {
    const productId = req.params.id;

    const cart = await CartModel.findOne({ userId: req.auth.id }).populate(
      "items.productId"
    );

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Filter out item
    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );

    // Recalculate totalPrice
    cart.totalPrice = cart.items.reduce((acc, item) => {
      const price = item?.productId?.price || 0;
      const quantity = item?.quantity || 0;
      return acc + price * quantity;
    }, 0);

    await cart.save(); // Make sure this is executed

    res.status(200).json({ message: "Product removed from cart"});
  } catch (error) {
    console.error("Delete Cart Item Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

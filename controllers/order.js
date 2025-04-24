import { CartModel } from "../models/cart";
import { OrderModel } from "../models/order";
import { UserModel } from "../models/user";

// Create order
const checkOut = async(req,res) => {
    const {shippingAddress} = req.body;

    const cart = CartModel.findOne({userId: req.auth.id}).populate('items.productId');
    if(!cart || cart.items.length === 0 ) return res.status(400).json({error: 'Cart is empty'});

    // Validate productIds
    const invalidItems = cart.items.filter(item => !item.productId);
    if(invalidItems.length > 0){
        return res.status(400).json({
            error: 'Cart contains invalid or deleted products',
            invalidItems: invalidItems.map(item => item.productId)
        });
    } 

    // Calculate total amount
    const totalAmount = cart.items.reduce((sum,item) => {
        return sum + item.productId.price * item.quantity;
    },0);

    // Get user details (eg. name)
    const user = await UserModel.findById(req.auth.id);
    if(!user) return res.status(404).json({error: 'User not found.'});

    // Create order
    const order = await OrderModel.create({
        userId: req.auth.id,
        items: cart.items.map(item => ({
            productId: item.productId.id,
            quantity: item.quantity,
            price: item.productId.price
        })),
        totalAmount,
        shippingAddress,
        status: 'pending'
    })

    // Generate Whatsapp message
    const itemsList = cart.items
}
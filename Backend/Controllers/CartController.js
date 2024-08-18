import CartItem from "../models/Cart.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";


// adding to the cart
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity ,userId} = req.body;
  console.log(req.body);
  const userId = userId;
  console.log(userId);
  try {
    let cartItem = await CartItem.findOne({ userId, productId });
    if (cartItem) {
      cartItem.quantity = quantity;
      cartItem.updatedAt = Date.now();
    } else {
      cartItem = new CartItem({ userId, productId, quantity });
    }
    await cartItem.save();
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: "Unable to add item to cart" });
  }
});


// getting to the cart
const getCart = asyncHandler(async (req, res) => {
  const userId = req.params.id;                        
  try {
    const cartItems = await CartItem.find({ userId });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch cart items" });
  }
});

// updating from the cart
const updateCartItem = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;
  try {
    const cartItem = await CartItem.findOneAndUpdate(
      { userId, productId },
      { quantity, updatedAt: Date.now() },
      { new: true }
    );
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: "Unable to update cart item" });
  }
});

//deleting from the cart
const deleteCartItem = asyncHandler(async (req, res) => {
  const userId = req.params.userid;                            //userid and productid from url parameter
  const productId = req.params.productid;
  try {
    const result = await CartItem.deleteOne({ userId, productId });
    if (result.deletedCount === 0) {
        console.log({userId, productId});
      return res.status(404).json({ message: "Item not found in cart" });
    }
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

export { addToCart, getCart, updateCartItem, deleteCartItem };

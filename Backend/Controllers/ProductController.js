import asyncHandler from 'express-async-handler'
import Product from '../models/Products.js'

// get product
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({createdAt:-1})
  res.status(200).json({"success":true,"message":products })
});

//Get Product by Id
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json({"success":true,"message":product})
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
});

// post the product
const addProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
  })
  const createdProduct = await product.save()
  res.status(201).json({"success":true,"message":createdProduct})
});

export {
  getProducts,
  getProductById,
  addProduct
};
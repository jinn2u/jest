const productModel = require('../models/Product')

exports.createProduct = async(req,res,next) => {
  try{
    const createProduct = await productModel.create(req.body)
    res.status(201).json(createProduct)

  } catch(e){
    // console.error(e)
    next(e)
    res.status(400).json(e)
  }
}
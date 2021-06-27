const productModel = require('../models/Product')

exports.createProduct = async(req,res,next) => {
  try{
    const createProduct = await productModel.create(req.body)
    return res.status(201).json(createProduct)
  } catch(e){
    // next에 넣지 않으면 비동기로 동작하는 함수에 대하여 에러핸들러가 처리하지 못한다.
    // console.error(e)
    next(e)
  }
}

exports.getProducts = async(req,res,next)=>{
  try{
    const data = await productModel.find({})
    return res.status(200).json(data)
  }catch(e){
    // console.error(e)
    next(e)
  }
}
exports.getProductById = async (req, res, next) => {
  const {productId} = req.params
   try{
    const product = await productModel.findById(productId)
    if(!product){
      return res.status(404).send()
    } 
    return res.status(200).json(product)
   }catch(e){
    //  console.error(e)
    next(e)
   }
}
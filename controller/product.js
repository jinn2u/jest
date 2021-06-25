const productModel = require('../models/Product')

exports.createProduct = async(req,res,next) => {
  try{
    const createProduct = await productModel.create(req.body)
    res.status(201).json(createProduct)
  } catch(e){
    // next에 넣지 않으면 비동기로 동작하는 함수에 대하여 에러핸들러가 처리하지 못한다.
    next(e)
  }
}

exports.getProducts = async(req,res,next)=>{
  try{
    const data = await productModel.find({})
    res.status(200).json(data)
  }catch(e){
    next(e)
  }


}
const Router = require('Express')
const product = new Router()

const {createProduct,getProducts} = require('../controller/product')

product.post('',createProduct)
product.get('/all',getProducts)
module.exports = product

const Router = require('Express')
const product = new Router()

const {createProduct,getProducts, getProductById} = require('../controller/product')

product.post('',createProduct)
product.get('/all',getProducts)
product.get('/:productId',getProductById)
module.exports = product

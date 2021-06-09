const express = require('Express')
const router = express.Router()
const productController = require('../controller/product')

router.get('',productController.createProduct)

module.exports = router
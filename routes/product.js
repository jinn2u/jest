const express = require('Express')
const router = express.Router()
const {createProduct} = require('../controller/product')

router.post('',createProduct)

module.exports = router
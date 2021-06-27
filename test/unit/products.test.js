const { createProduct, getProducts, getProductById } = require('../../controller/product')
const productModel = require('../../models/Product')
const httpMocks = require('node-mocks-http')

const { mocked_Product } = require('../data/new_product.json')
const mocked_allProducts = require('../data/all-product.json')

productModel.create = jest.fn()
productModel.find = jest.fn()
productModel.findById = jest.fn()

let req, res, next
beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse()
  next = jest.fn()
})

describe('Product Controller Create', () => {
  it('should have a create Product function', async () => {
    expect(typeof createProduct).toBe('function')
  })
  it('should call ProductModel.create', async () => {
    await createProduct(req, res, next)
    expect(productModel.create).toBeCalledWith(req.body);
  })
  it('should return 201 response code', async () => {
    await createProduct(req, res, next)
    expect(res.statusCode).toBe(201)
    expect(res._isEndCalled()).toBeTruthy()
  })
  it('should return json body in response', async () => {
    productModel.create.mockReturnValue(mocked_Product)
    await createProduct(req, res, next)
    expect(res._getJSONData()).toStrictEqual(mocked_Product)
  })
  it('should handle errors', async () => {
    const errorMessage = { message: "description is not exist" }
    const rejectedPromise = Promise.reject(errorMessage)
    productModel.create.mockReturnValue(rejectedPromise)
    await createProduct(req, res, next)
    expect(next).toBeCalledWith(errorMessage)
  })
})



describe("Product Controller Get", () => {
  it('should have a getProducts function', () => {
    expect(typeof getProducts).toBe('function')
  })
  it('should call ProductModel.find({})', async () => {
    await getProducts(req, res, next)
    expect(productModel.find).toHaveBeenCalledWith({})
    expect(res.statusCode).toBe(200)
    expect(res._isEndCalled).toBeTruthy()
  })
  it('should return json body in response', async () => {
    productModel.find.mockReturnValue(mocked_allProducts)
    await getProducts(req, res, next)
    expect(res._getJSONData()).toStrictEqual(mocked_allProducts)
  })
  it('should handle errors', async () => {
    const errorMessage = {message: 'Error finding product data false'}
    const rejectedPromise = Promise.reject(errorMessage)
    productModel.find.mockReturnValue(rejectedPromise)
    await getProducts(req, res, next)
    expect(next).toHaveBeenCalledWith(errorMessage)
  })
  it('should call productModel.findById', async() => {
    expect(typeof getProductById).toBe('function')
    req.params.productId = "1234qaer"
    await getProductById(req, res, next)
    expect(productModel.findById).toBeCalledWith(req.params.productId)
  })
  it('should return json and response code 200', async () => {
    productModel.findById.mockReturnValue(mocked_Product)
    await getProductById(req,res,next)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toStrictEqual(mocked_Product)
    expect(res._isEndCalled()).toBeTruthy
  })
  it('should return 404 when item does not exist', async () => {
    productModel.findById.mockReturnValue(null)
    await getProductById(req, res, next)
    expect(res.statusCode).toBe(404)
    expect(res._isEndCalled()).toBeTruthy()
  })
  it('should hadle errors', async () => {
    const errorMessage = {message: 'getProductById has some error'}
    const rejectedPromise = Promise.reject(errorMessage)
    productModel.findById.mockReturnValue(rejectedPromise)
    await getProductById(req, res, next)
    expect(next).toBeCalledWith(errorMessage)
  })
})

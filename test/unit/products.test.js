const productController = require('../../controller/product')
const productModel = require('../../models/Product')
const httpMocks = require('node-mocks-http')
productModel.create = jest.fn()

let  req, res, next

beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse()
  next = null
})

describe('Product Controller Create', () => {
  const mocked_Product = {
    "name ": "test_name",
    "description": "test_desc",
    "price": 1
  }
  it('should have a create Product function', () => {
    expect(typeof productController.createProduct).toBe('function')
  })
  it('should call ProductModel.create', () => {
    productController.createProduct(req, res, next)
    expect(productModel.create).toBeCalledWith(req.body);
  })
  it('should return 201 response code', () => {
    productController.createProduct(req, res, next)
    expect(res.statusCode).toBe(201)
    expect(res._isEndCalled()).toBeTruthy()
  })
  it('should return json body in response', () => {
    productModel.create.mockReturnValue(mocked_Product)
    productController.createProduct(req,res,next)
    expect(res._getJSONData()).toStrictEqual(mocked_Product)
  })
})


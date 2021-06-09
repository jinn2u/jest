const productController = require('../../controller/product')
const productModel = require('../../models/Product')

productModel.create = jest.fn()

describe('Product Controller Create', () => {
  it('should have a create Product function', () => {
    expect(typeof productController.createProduct).toBe('function')
  })
  it('should call ProductModel.create', () => {
    productController.createProduct()
    expect(productModel.create).toBeCalled();
  });
})


const request = require('supertest')
const mongoose = require("mongoose")
const app = require('../../server')
const { mocked_Product } = require('../data/new_product.json')
require('dotenv').config

let firstProduct

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log("몽고디비 연결 완료"))
    .catch((e) => console.error(e))
})
afterAll(async () => {
  await mongoose.disconnect();

  await mongoose.connection.close()
})

describe("POST /api/product", () => {
  it('should be success', async () => {
    const res = await request(app).post('/api/product')
      .send(mocked_Product)
    expect(res.statusCode).toBe(201)
    expect(res.body.name).toBe(mocked_Product.name)
  })
  it('should be return 500 on POST /api/product', async () => {
    const res = await request(app).post('/api/product')
      .send({ name: 't_name' })
    expect(res.statusCode).toBe(500)
    expect(res.body).toStrictEqual({ message: 'Product validation failed: description: Path `description` is required.' })
  })
})

describe("GET/ /api/product/all", () => {
  it('should be success', async () => {
    const res = await request(app).get('/api/product/all')
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBeTruthy()
    expect(res.body[0].name).toBeDefined()
    expect(res.body[0].description).toBeDefined()
    firstProduct = res.body[0]
  })
})

describe("[GET] /api/product/:productId", () => {
  it("should be success", async () => {
    const res = await request(app).get(`/api/product/`+firstProduct._id)
    expect(res.statusCode).toBe(200)
    expect(res.body.name).toBe(firstProduct.name)
    expect(res.body.description).toBe(firstProduct.description)
  })
  it("should be fail", async () => {
    const res = await request(app).get('/api/product/60cc70216198ee843fec1ea1')
    expect(res.statusCode).toBe(404)
  })
})




const request = require('supertest')
const mongoose = require("mongoose")
const app = require('../../server')
const {mocked_Product} = require('../data/new_product.json')
require('dotenv').config


describe("POST /api/products", () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }) 
    .then(()=> console.log("몽고디비 연결 완료"))
    .catch((e)=> console.error(e))
  }) 
  afterEach(async () => {
    await removeAllCollections()
  })
  afterAll(async()=>{
    await dropAllCollections()
    await mongoose.connection.close()
  })


  it('should be success', async()=>{
    const res = await request(app).post('/api/product')
      .send(mocked_Product)
    expect(res.statusCode).toBe(201)
    expect(res.body.name).toBe(mocked_Product.name)
  })
  it('should be return 500 on POST /api/product', async () => {
    const res = await request(app).post('/api/product')
      .send({name: 't_name'}) 
    expect(res.statusCode).toBe(500)
    expect(res.body).toStrictEqual({message:'Product validation failed: description: Path `description` is required.'})
  })

})





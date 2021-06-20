const request = require('supertest')
const mongoose = require("mongoose")
const app = require('../../server')
const {mocked_Product} = require('../new_product.json')
require('dotenv').config


describe("Temp test", () => {
  // let server
  // if(process.env.NODE_ENV === 'test'){
  //    server= app.listen()
  // }

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }) 
    .then(()=> console.log("몽고디비 연결 완료"))
    .catch((e)=> console.error(e))
   
  }) 
  afterAll(async()=>{
    await mongoose.disconnect()
  })
  it('should be success', async()=>{
    const res = await request(app).post('/api/product')
      .send(mocked_Product)
      console.log(res.statusCode)
      expect(res.statusCode).toBe(201)
      expect(res.body.name).toBe(mocked_Product.name)
    })
  })





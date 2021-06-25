const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5000
const HOST = '0,0,0,0'
require('dotenv').config()
const productRoutes = require('./routes/product-route')

app.use(express.json())


if(process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true 
  })
    .then(()=> console.log(`MongoDB Connected...`))
    .catch(e=>console.log(e))
}




app.use("/api/product", productRoutes)

app.get('/',(req, res)=>{

  res.send('Hello World')
})

app.use((error,req,res,next)=>{
  res.status(500).json({message: error.message})
})
if(process.env.NODE_ENV !== 'test') {
  app.listen(PORT,()=>console.log(`server is running on http://localhost:${PORT}`))
}

module.exports = app



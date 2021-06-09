const express = require('express')
const app = express()
const mongoose = require('mongoose')

const PORT = 5000
const HOST = '0,0,0,0'
const {USER_NAME, PASSWORD} = require('./config')

const productRoutes = require('./routes/product')


app.use(express.json())
mongoose.connect(`mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.wswtw.mongodb.net/test?retryWrites=true&w=majority`,{
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
.then(()=> console.log(`MongoDB Connected...`))
.catch(e=>console.log(e))






app.use("/api/product", productRoutes)
app.get('/',(req, res)=>{

  res.send('Hello World')
})








app.listen(PORT,()=>console.log(`server is running on http://localhost:${PORT}`))
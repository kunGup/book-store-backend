const express = require('express')
const app = express()
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require("./routes/product");
const braintreeRoutes = require("./routes/braintree");
const orderRoutes = require("./routes/order");
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true})
    .then(()=>console.log('DB connected'))

mongoose.connection.on('error',err=>{
    console.log(`DB connection error: ${err.message}`);
})

//middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())

//routes middlewares
app.use('/api',authRoutes)
app.use('/api',userRoutes)
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", braintreeRoutes);
app.use("/api", orderRoutes);

const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
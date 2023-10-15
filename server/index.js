const express = require('express');
const cors = require("cors");
require('dotenv').config()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3001;


const userRouter = require('./routes/User');
const productRouter = require('./routes/Product');
const cartRouter = require('./routes/Cart');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())





const ConnectionString = process.env.ConnectionString;

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})



app.use('/api/products', productRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);

mongoose.connect(ConnectionString, ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
}))
  .then(() => {
      console.log('Connected to mongodb');
      app.listen(PORT);
      console.log(PORT);
  })
  .catch(err => { console.log(err) });
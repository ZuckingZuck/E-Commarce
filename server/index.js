const express = require('express');
require('dotenv').config()
const stripe = require('stripe')('sk_test_51MxaYkJH6v2VqZAT8Ns8P0UGwlptqEArS5ztJAVwg8eC5DU50OcaTEgQ65elyt82xaYrHB3s5rb09MJdK0ifUfPh00r17tZb9I');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3001;


const userRouter = require('./routes/User');
const productRouter = require('./routes/Product');
const cartRouter = require('./routes/Cart');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())


app.post('/create-payment-intent', async (req, res) => {
    console.log('istek geldi');
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd'
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating PaymentIntent.' });
  }
});


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
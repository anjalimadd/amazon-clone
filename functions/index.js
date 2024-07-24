const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(
  'sk_test_51MiKknSFw2QbcGxaNRQ0JIzEJT249Tfz9uQuwlTFgP5VS7uHdBhB4MhrWppbpC6JNDVIKz2wWpmoAyLQ8MQB2c8r00OeiWFwFN'
);

// API

// App config
const app = express();


// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Api routes --'/'
app.get('/', (request, response) => response.status(200).send('Hello World!'));

app.post('/payments/create', async (request, response) => {
  const total = request.query.total;
  console.log('Payment Request Recieved for this amount >>>>', total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'usd',
  });
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
  
});

// Listen command
exports.api = functions.https.onRequest(app);
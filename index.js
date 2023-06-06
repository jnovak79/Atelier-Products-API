require('dotenv').config();
const dbPOS = require('./dbPOS.js');
const controllersPOS = require ('./controllersPOS.js');

const express = require('express');
const app = express();
const port = process.env.PORT;
const path = require('path');


app.use(express.json());

app.get('/products', (req, res) => {
  controllersPOS.getProducts(req)
    .then ((result) =>{
      res.status(200).send(result);
    }
    )
    .catch ((err) => {
      res.status(500).send('Error retrieving from database');
    })
})

app.get('/products/:product_id', (req, res) => {
  controllersPOS.getProductInformation (req.params.product_id)
    .then((result) => {
      res.status(200).send(result)
    })
    .catch((err) => {
      res.status(500).send('Error retrieving from database');
    })
})

app.get('/products/:product_id/styles', (req, res) => {
  controllersPOS.getProductStyles (req.params.product_id)
    .then((result) => {;
      res.status(200).send(result)
    })
    .catch((err) => {
      res.status(500).send('Error retrieving from database');
    })
})

app.get('/products/:product_id/related', (req, res) => {
  controllersPOS.getRelatedProducts (req.params.product_id)
    .then((result) => {;
      res.status(200).send(result)
    })
    .catch((err) => {
      res.status(500).send('Error retrieving from database');
    })
})

app.get('/loaderio-b7b615b9c47c50519d5ac3e70558e6f4', (req, res) => {
  res.status(200).send('loaderio-b7b615b9c47c50519d5ac3e70558e6f4')
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

dbPOS.initialize();



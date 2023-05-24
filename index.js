require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;
const path = require('path');
const controllers = require('./controllers.js';)

app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/dist')));



app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
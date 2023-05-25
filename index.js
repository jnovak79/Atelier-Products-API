require('dotenv').config();
const connection = require('./dbSQL.js');

const dbPOS = require ('./dbPOS.js');
const express = require('express');
const app = express();
const port = process.env.PORT;
const path = require('path');
// const controllers = require('./controllers.js');

// connection.initialize();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/dist')));



app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

dbPOS.seqAddWord('word', 'other word')
  .then((result) => {console.log('SUCCESS')})
  .catch((err) => {console.log(err)})

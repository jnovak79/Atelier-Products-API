// const dbMon = require ('./dbMon.js');
// const csv = require ('csv-parser');
const fs = require('fs');
const { Pool } = require ('pg');
const path = require('path');

const csvFilePath = path.join(__dirname, './Individual-SDC-CSV-Files/skus.csv');
console.log('processing');

const pool = new Pool ({
  username: process.env.SQLUSERNAME,
  password: process.env.SQLPASSWORD,
  database: process.env.DATABASE,
  port: process.env.SQLPORT,
  host: 'localhost'
})


// Copying a database into postgreSQL Skus
// COPY "Skus"("SKU_id", "style_id", "size", "quantity") FROM '(PathToCSV)' DELIMITER ',' CSV HEADER

// const sample = new dbMon.Product({
//   id: 1,
//   name: 'Sample',
//   slogan: 'Sample Slogan',
//   description: 'Sample',
//   category: 'Sampled',
//   default_price: '223',
//   photos: [{thumbnail_url: '', url: ''}],
//   skus: [{unit_id: '', quantity: 0, size: ''}]
// })

// fs.createReadStream('../Individual-SDC-CSV-Files/product.csv')
//   .pipe(csv({}))
//   .on('data', (data) => {console.log(data)})
//   .on('end', (data) => {
//     console.log(results);
//   })

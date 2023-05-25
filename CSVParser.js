const dbMon = require ('./dbMon.js');
const csv = require ('csv-parser');
const fs = require('fs');

const results = [];
console.log('processing');

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


fs.createReadStream('../Individual-SDC-CSV-Files/product.csv')
  .pipe(csv({}))
  .on('data', (data) => {console.log(data)})
  .on('end', (data) => {
    console.log(results);
  })

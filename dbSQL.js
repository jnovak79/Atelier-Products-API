require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'SDC_Products'
});

let initialize = function () {
  connection.query(
    "CREATE TABLE IF NOT EXISTS Products (id INT AUTO_INCREMENT "
    + "PRIMARY KEY, name VARCHAR (255), slogan VARCHAR (1000), "
    + "description VARCHAR (1000), category VARCHAR (255), "
    + "default_price VARCHAR (255))",
    function(err, results) {
      if (err) {
        return;
      }
      return console.log('Products Table Created');
    }
  )

  connection.query (
    "CREATE TABLE IF NOT EXISTS Features (id INT, "
    + "feature VARCHAR (255), value VARCHAR (255))",
    function (err, results) {
      if (err) {
        return;
      }
      return console.log('Features Table Created')
    }
  )

  connection.query (
    "CREATE TABLE IF NOT EXISTS Styles (product_id INT, "
    + "style_id INT AUTO_INCREMENT PRIMARY KEY, "
    + "name VARCHAR (255), original_price VARCHAR (255), "
    + "sale_price VARCHAR (255), `default?` BOOLEAN)",
    function (err, results) {
      if (err) {
        return;
      }
      return console.log('Styles Table Created')
    }
  )

  connection.query (
    "CREATE TABLE IF NOT EXISTS SKUS (product_id INT, "
    + "style_id INT, size VARCHAR (255), quantity VARCHAR (255))",
    function (err, results) {
      if (err) {
        return;
      }
      return console.log('SKUS Table Created')
    }
  )

  connection.query (
    "CREATE TABLE IF NOT EXISTS Photos (product_id INT, "
    + "style_id INT, thumbnail_url VARCHAR (1000), "
    + "url VARCHAR(1000))",
    function (err, results) {
      if (err) {
        return;
      }
      return console.log('Photos Table Created')
    }
  )
}

module.exports.connection = connection;
module.exports.initialize = initialize;
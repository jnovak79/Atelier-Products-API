require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const { Pool } = require ('pg');
const db = {};

const sequelize = new Sequelize({
  username: process.env.SQLUSERNAME,
  password: process.env.SQLPASSWORD,
  database: process.env.DATABASE,
  port: process.env.SQLPORT,
  host: 'localhost',
  dialect: 'postgres',
});

let testSequelize = async function() {
  await sequelize.authenticate()
    .then((data) => {
      console.log('Connection has been established successfully.');
    })
    .catch ((error) => {
    console.error('Unable to connect to the database:', error);
  })
}

testSequelize();

db.Product = sequelize.define('Product', {
  product_id : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255)
  },
  slogan: {
    type: DataTypes.STRING(1000)
  },
  description: {
    type: DataTypes.STRING(1000)
  },
  category: {
    type: DataTypes.STRING(255)
  },
  default_price: {
    type: DataTypes.STRING(255)
  }
})

// "CREATE TABLE IF NOT EXISTS Products (id INT AUTO_INCREMENT "
// + "PRIMARY KEY, name VARCHAR (255), slogan VARCHAR (1000), "
// + "description VARCHAR (1000), category VARCHAR (255), "
// + "default_price VARCHAR (255))",

db.Feature = sequelize.define('Feature', {
  feature_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  product_id : {
    type: DataTypes.INTEGER,
  },
  feature: {
    type: DataTypes.STRING(255)
  },
  value: {
    type: DataTypes.STRING(255)
  },
})

// "CREATE TABLE IF NOT EXISTS Features (id INT, "
// + "feature VARCHAR (255), value VARCHAR (255))",

db.Style = sequelize.define('Style', {
  "product_id": {
    type: DataTypes.INTEGER,
  },
  "style_id": {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  "name": {
    type: DataTypes.STRING(255)
  },
  "original_price": {
    type: DataTypes.STRING(255)
  },
  "sale_price": {
    type: DataTypes.STRING(255)
  },
  "default?": {
    type: DataTypes.BOOLEAN
  }
})

// "CREATE TABLE IF NOT EXISTS Styles (product_id INT, "
// + "style_id INT AUTO_INCREMENT PRIMARY KEY, "
// + "name VARCHAR (255), original_price VARCHAR (255), "
// + "sale_price VARCHAR (255), `default?` BOOLEAN)",

db.Sku = sequelize.define('Sku', {
  SKU_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  style_id : {
    type: DataTypes.INTEGER,
  },
  size: {
    type: DataTypes.STRING(255)
  },
  quantity: {
    type: DataTypes.STRING(255)
  }
})

// "CREATE TABLE IF NOT EXISTS SKUS (product_id INT, "
// + "style_id INT, size VARCHAR (255), quantity VARCHAR (255))",

db.Photo = sequelize.define('Photo', {
  photo_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  style_id : {
    type: DataTypes.INTEGER,
  },
  thumbnail_url: {
    type: DataTypes.STRING(100000)
  },
  url: {
    type: DataTypes.STRING(100000)
  }
})

db.Relate = sequelize.define('Relate', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  current_product_id : {
    type: DataTypes.INTEGER
  },
  related_product_id: {
    type: DataTypes.INTEGER
  }
})


db.initialize = async function () {
  await db.Product.sync();
  await db.Feature.sync();
  await db.Style.sync();
  await db.Sku.sync();
  await db.Photo.sync();
  await db.Relate.sync();
}

// "CREATE TABLE IF NOT EXISTS Photos (product_id INT, "
// + "style_id INT, thumbnail_url VARCHAR (1000), "
// + "url VARCHAR(1000))",

module.exports = db;

// db.PhotoAdd = function (columns) {
//   return db.Photo.create({
//     product_id: columns.product_id,
//     style_id: columns.style_id,
//     thumbnail_url: columns.thumbnail_url,
//     url: columns.url
//   })
// }


// const seqWord = sequelize.define('Word' , {
//   word: {
//     type: DataTypes.STRING
//   },
//   definition: {
//     type: DataTypes.STRING
//   }
// });

// seqWord.sync({ force: true });

// db.seqAddWord = function (word, definition) {
//   return seqWord.create({
//     word: word,
//     definition: definition
//   })
// }



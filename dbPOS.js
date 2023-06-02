require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const { Pool } = require ('pg');
const db = {};

const sequelize = new Sequelize({
  username: process.env.SQLUSERNAME,
  password: process.env.SQLPASSWORD,
  database: process.env.DATABASE,
  port: process.env.SQLPORT,
  host: process.env.DB_HOST,
  dialect: 'postgres',
  benchmark: true,
  logging: true
});

let testSequelize = async function() {
  await sequelize.authenticate()
    .then((data) => {
      console.log('Connection has been established successfully.');
    })
    .catch ((error) => {
    console.error('Unable to connect to the database:');
  })
}

testSequelize();

db.Product = sequelize.define('Product', {
  product_id : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    index: true
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
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
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
    index: true
  },
  feature: {
    type: DataTypes.STRING(255)
  },
  value: {
    type: DataTypes.STRING(255)
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
  }
})

// "CREATE TABLE IF NOT EXISTS Features (id INT, "
// + "feature VARCHAR (255), value VARCHAR (255))",

db.Style = sequelize.define('Style', {
  "product_id": {
    type: DataTypes.INTEGER,
    index: true
  },
  "style_id": {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    index: true,
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
  },
  "updatedAt": {
    type: DataTypes.DATE,
    allowNull: true,
  },
  "createdAt": {
    type: DataTypes.DATE,
    allowNull: true,
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
    index: true,
    allowNull: false,
  },
  size: {
    type: DataTypes.STRING(255)
  },
  quantity: {
    type: DataTypes.STRING(255)
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
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
    index: true,
    allowNull: false,
  },
  thumbnail_url: {
    type: DataTypes.TEXT
  },
  url: {
    type: DataTypes.TEXT
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
  }
})

db.Relate = sequelize.define('Relate', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  current_product_id : {
    type: DataTypes.INTEGER,
    index: true
  },
  related_product_id: {
    type: DataTypes.INTEGER
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
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

db.Style.hasMany(db.Photo, { foreignKey: 'style_id' });
db.Photo.belongsTo(db.Style, { foreignKey: 'style_id' });
db.Style.hasMany(db.Sku, { foreignKey: 'style_id' });
db.Sku.belongsTo(db.Style, { foreignKey: 'style_id' });
db.Product.hasMany(db.Feature, { foreignKey: 'product_id' });
db.Feature.belongsTo(db.Product, { foreignKey: 'product_id'});

module.exports = db;
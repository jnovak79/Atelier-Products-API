const dbPOS = require ('./dbPOS.js');
const { Pool } = require ('pg');
const { Sequelize, DataTypes, Op } = require('sequelize');

const controller = {};

controller.getProducts = async function(req) {
  let page = req.query.page || 1;
  let startingPoint = 37311;
  let count = req.query.count || 5;
  let endingPoint = Number(startingPoint) + Number(count);
  if (req.query.page) {
    startingPoint = (startingPoint + (req.query.page - 1) * req.query.count);
    endingPoint = Number(startingPoint) + Number(count);
  }
  let queryResult = await dbPOS.Product.findAll({
    attributes: ['name', 'slogan', 'description', 'category', 'default_price', 'product_id'],
    where: {
      product_id: {
        [Op.gte]: startingPoint
      }
    },
    order: [
      ['product_id', 'ASC']
    ],
    limit: 15
  });

  for (let product of queryResult) {
    product.dataValues.id = product.dataValues.product_id;
    delete product.dataValues.product_id;
  }
  return queryResult;
}

controller.getProductInformation = async function(id) {
  let queryResult = await dbPOS.Product.findByPk(id, {
    attributes: ['name', 'slogan', 'description', 'category', 'default_price']
  });
  let queryResultForFeatures = await dbPOS.Feature.findAll({
    attributes: ['feature', 'value'],
    where: {
      product_id: id
    }
  })
  queryResult.dataValues.features = queryResultForFeatures;
  queryResult.dataValues.id = queryResult.dataValues.product_id;
  delete queryResult.dataValues.product_id;
  return queryResult;
}

controller.getProductStyles = async function(id) {
  let queryResult = await dbPOS.Style.findAll({
    attributes: ['style_id', 'name', 'original_price', 'sale_price', 'default?'],
    where: {
      product_id: id
    },
    include: [
        {
          model: dbPOS.Photo,
          attributes: ['thumbnail_url', 'url'],
        },
        {
          model: dbPOS.Sku,
          attributes: ['SKU_id', 'size', 'quantity'],
        }
    ],
  })

  let result = {product_id: id};
  result.results = queryResult;
  for (let eachStyle of result.results) {
    eachStyle.dataValues.photos = eachStyle.dataValues.Photos;
    delete eachStyle.dataValues.Photos;
    let skusValues = {};
    for (let skusUnit of eachStyle.dataValues.Skus) {
      skusValues[skusUnit.SKU_id] = {
         size: skusUnit.size,
         quantity: skusUnit.quantity
      }
    }
    delete eachStyle.dataValues.Skus;
    eachStyle.dataValues.skus = skusValues;
  }

  return result;
}


controller.getRelatedProducts = async function (id) {
  let queryResult = await dbPOS.Relate.findAll({
    attributes: ['related_product_id'],
    where: {
      current_product_id: id
    },
    raw: true
  });

  let result = queryResult.map((relatedProduct) => relatedProduct.related_product_id);
  return result;
};

module.exports = controller;
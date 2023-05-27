const dbPOS = require ('./dbPOS.js');
const { Pool } = require ('pg');
const { Sequelize, DataTypes, Op } = require('sequelize');

const controller = {};
// dbPOS.Product
// dbPOS.Feature
// dbPOS.Style
// dbPOS.Sku
// dbPOS.Photo
// dbPOS.Relate

controller.getProducts = async function(req) {
  let page = req.query.page || 1;
  let startingPoint = 37311;
  let count = req.query.count || 5;
  let endingPoint = Number(startingPoint) + Number(count);
  if (req.query.page) {
    startingPoint = (startingPoint + (req.query.page - 1) * req.query.count);
    endingPoint = Number(startingPoint) + Number(count);
    console.log(startingPoint, endingPoint);
  }
  let queryResult = await dbPOS.Product.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt']},
    where: {
      product_id: {
        [Op.between]: [startingPoint, endingPoint]
      }
    }
  })
  for (let product of queryResult) {
    console.log(product);
    product.dataValues.id = product.dataValues.product_id;
    delete product.dataValues.product_id;
  }
  return queryResult;
}

controller.getProductInformation = async function(id) {
  let queryResult = await dbPOS.Product.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt']},
    where: {
      product_id: id
    }
  })
  let queryResultForFeatures = await dbPOS.Feature.findAll({
    attributes: ['feature', 'value'],
    where: {
      product_id: id
    }
  })
  queryResult[0].dataValues.features = queryResultForFeatures;
  queryResult[0].dataValues.id = queryResult[0].dataValues.product_id;
  delete queryResult[0].dataValues.product_id;
  return queryResult[0];
}

controller.getProductStyles = async function(id) {
  let queryResult = await dbPOS.Style.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt', 'product_id']},
    where: {
      product_id: id
    }
  })

  await Promise.all(queryResult.map(async function (singleStyle) {
    // let queryResultPhotos = await dbPOS.Photo.findAll({
    //   attributes: {exclude: ['createdAt',
    //   'updatedAt', 'photo_id', 'style_id']},
    //   where: {
    //     style_id: singleStyle.dataValues.style_id
    //   }
    // })
    // let queryResultSKUS = await dbPOS.Sku.findAll({
    //   attributes: {exclude: ['createdAt',
    //   'updatedAt', 'style_id']},
    //   where: {
    //     style_id: singleStyle.dataValues.style_id
    //   }
    // })
    // Style model definition

    // Define the association between Style and Photo
    dbPOS.Style.hasMany(dbPOS.Photo, { foreignKey: 'style_id' });
    dbPOS.Photo.belongsTo(dbPOS.Style, { foreignKey: 'style_id' });
    dbPOS.Style.hasMany(dbPOS.Sku, { foreignKey: 'style_id' });
    dbPOS.Sku.belongsTo(dbPOS.Style, { foreignKey: 'style_id' });

    let queryResultStyle = await dbPOS.Style.findByPk(singleStyle.dataValues.style_id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: dbPOS.Photo,
          attributes: { exclude: ['createdAt', 'updatedAt', 'photo_id', 'style_id'] },
        },
        {
          model: dbPOS.Sku,
          attributes: { exclude: ['createdAt', 'updatedAt', 'style_id'] },
        }
      ]
    });

    let queryResultPhotos = queryResultStyle.Photos;
    let queryResultSKUS = queryResultStyle.Skus;

    let skusValues = {};
    for (let skusUnit in queryResultSKUS) {
      skusValues[queryResultSKUS[skusUnit].dataValues.SKU_id] = {
         size: queryResultSKUS[skusUnit].dataValues.size,
         quantity: queryResultSKUS[skusUnit].dataValues.quantity
      }
    }
    singleStyle.dataValues.photos = queryResultPhotos;
    singleStyle.dataValues.skus = skusValues;
  }))

  let result = {product_id: id};
  result.results = queryResult;
  return result;
}
// parameters are product id
// integers

controller.getRelatedProducts = async function(id) {
  let queryResult = await dbPOS.Relate.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt']},
    where: {
      current_product_id: id
    }
  })
  let result = [];
  for (let relatedProduct of queryResult) {
    result.push(relatedProduct.dataValues.related_product_id);
  }
  return result;
}
// parameters are product id
// integers

module.exports = controller;
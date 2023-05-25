require('dotenv').config();
const mongoose = require('mongoose');


mongoose.connect(`mongodb://localhost:27107/${process.env.DB_NAME}`);

const productSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    slogan: String,
    description: String,
    category: String,
    default_price: String,
    features: [{feature: String, value: String}],
    related_products: [{id: Number}]
  }
)

const styleSchema = new mongoose.Schema (
  {
    'product_id': String,
    'style_id': Number,
    'name': String,
    'original_price': String,
    'sale_price': String,
    'default?': Boolean,
    'photos': [{thumbnail_url: String, url: String}],
    'skus': [{unit_id: String, quantity: Number, size: String}]
  }
)

const Product = new mongoose.model('Product', productSchema);

const Style = new mongoose.model('Style', styleSchema);

module.exports.Product = Product;
module.exports.Style = Style;


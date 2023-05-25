require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const db = {};

const sequelize = new Sequelize({
  username: process.env.SQLUSERNAME,
  password: process.env.SQLPASSWORD,
  database: process.env.DATABASE,
  port: 5432,
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

const seqWord = sequelize.define('Word' , {
  word: {
    type: DataTypes.STRING
  },
  definition: {
    type: DataTypes.STRING
  }
});

// seqWord.sync({ force: true });

db.seqAddWord = function (word, definition) {
  return seqWord.create({
    word: word,
    definition: definition
  })
}

module.exports = db;

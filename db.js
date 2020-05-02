const { Sequelize } = require('sequelize');
require("dotenv").config();
const tables = require('./models/');
const util = require('util');
const associations = require('./associations.js');
//const seed = require('./seeder')();

/*
  Establish connection to the database
  Requires DB, USERNAME, PASSWORD, HOST in your local environment variable file '.env' located in the root directory.
*/
const sequelize = new Sequelize(
  process.env.DB,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: 3306,
    dialect: "mysql",
    define: { underscored: true },
  }
);

for (let property in tables) {
  const table = tables[property](Sequelize);
  const {name, columns} = table;

  sequelize.define(name, columns, {freezeTableName: true, timestamps: false});
  console.log(util.inspect(sequelize.models[name]));
}

associations(sequelize.models);
console.log(util.inspect(sequelize.models.building));


module.exports = sequelize;
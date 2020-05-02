require('dotenv').config();
const sequelize = require('./db.js');
const seeder = require('./seeder.js')(sequelize.models);
const http = require('http');
const express = require('express');
const app = express();

const server = http.Server(app);

server.listen('8080', () => {
  return start();
});
const sync = () => sequelize.sync();

const startSeed = async () => {
  try {
    await sync();
    await seeder();
  } catch (err) {
    console.log(err);
  }
}
const start = async () => await startSeed();



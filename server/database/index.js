/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable import/newline-after-import */
require('dotenv').config();

const fs            = require('fs');
const path          = require('path');
const Sequelize     = require('sequelize');

const config        = require('../config')[process.env.NODE_ENV || 'development']
const modelsFolder  = path.join(__dirname, '../models');
const sequelize     = new Sequelize(config.url);
const db            = {};

// * TESTING THE CONNECTION
// sequelize.authenticate()
//     .then(() => console.log('Connection has been established successfully.'))
//     .catch((err) => console.log('Unable to connect to the database:', err))
//     .finally(() => sequelize.close())

fs
    .readdirSync(modelsFolder)
    .filter((file) => file.indexOf('.') !== 0 && file.slice(-3) === '.js' && file !== 'index.js')
    .forEach((file) => {
        const model = require(path.join(modelsFolder, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

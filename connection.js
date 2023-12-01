const {Sequelize} = require('sequelize');

const database = "DB_facturaORM";
const username = "postgres";
const password = "140220";
const host = "localhost";

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'postgres',
});

module.exports = {sequelize}
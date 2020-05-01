const Sequelize = require("sequelize");

const connection = new Sequelize("guiapress", "root", "3282", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;

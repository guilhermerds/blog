const Sequelize = require("sequelize");
const connection = require("../database/database");

const Category = connection.define("categories", {
  title: { type: Sequelize.STRING, allowNull: false },
  slug: { type: Sequelize.STRING, allowNull: false },
});

/*SLUG é a versão do titulo sem caracter especial e sem espaço,
EX title: react native, slug: react-native*/

module.exports = Category;

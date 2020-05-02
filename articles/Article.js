const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

const Article = connection.define("articles", {
  title: { type: Sequelize.STRING, allowNull: false },
  slug: { type: Sequelize.STRING, allowNull: false },
  body: { type: Sequelize.TEXT, allowNull: false },
});

//Definindo que uma categoria tem muitos artigos
Category.hasMany(Article);

//Definindo que um artigo pertence a uma categoria
Article.belongsTo(Category);

module.exports = Article;

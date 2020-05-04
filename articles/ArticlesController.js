const Express = require("Express");
const router = Express.Router();
const Article = require("./Article");
const Category = require("../categories/Category");

router.get("/articles", (req, res) => {
  res.send("Rota de artigo");
});

router.get("/admin/articles/new", (req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/articles/new", { categories });
  });
});

module.exports = router;

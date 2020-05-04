const Express = require("Express");
const router = Express.Router();

router.get("/articles", (req, res) => {
  res.send("Rota de artigo");
});

router.get("/admin/articles/new", (req, res) => {
  res.render("admin/articles/new");
});

module.exports = router;

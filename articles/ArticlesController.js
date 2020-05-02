const Express = require("Express");
const router = Express.Router();

router.get("/articles", (req, res) => {
  res.send("Rota de artigo");
});

router.get("/admin/articles/new", (req, res) => {
  res.send("Rota para criar um novo artigo");
});

module.exports = router;

const Express = require("Express");
const router = Express.Router();

router.get("/categories", (req, res) => {
  res.send("Rota de Categoria");
});

router.get("/admin/categories/new", (req, res) => {
  res.send("Rota para criar uma nova categoria");
});

module.exports = router;

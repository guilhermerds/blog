const Express = require("Express");
const router = Express.Router();

router.get("/admin/categories/new", (req, res) => {
  res.render("admin/categories/new");
});

module.exports = router;

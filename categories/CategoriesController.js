const Express = require("Express");
const router = Express.Router();
const Category = require("./Category");
const slugify = require("slugify");

router.get("/admin/categories/new", (req, res) => {
  res.render("admin/categories/new");
});

router.post("/categories/save", (req, res) => {
  const { title } = req.body;

  if (title != undefined) {
    Category.create({
      title,
      slug: slugify(title),
    }).then(() => {
      res.redirect("/");
    });
  } else {
    res.redirect("/admin/categories/new");
  }
});

router.get("/admin/categories", (req, res) => {
  Category.findAll().then((categories) => {
    if (categories != undefined) {
      res.render("admin/categories/index", { categories });
    }
  });
});

module.exports = router;

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
      res.redirect("/admin/categories");
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

router.post("/categories/delete", (req, res) => {
  const { id } = req.body;
  if (id != undefined) {
    if (!isNaN(id)) {
      //Deleta o registro no bd
      Category.destroy({
        where: {
          id,
        },
      }).then(() => {
        res.redirect("/admin/categories");
      });
    } else {
      res.redirect("/admin/categories");
    }
  } else {
    res.redirect("/admin/categories");
  }
});

router.get("/admin/categories/edit/:id", (req, res) => {
  const { id } = req.params;
  //Metodo para encontrar uma primary key

  if (isNaN(id)) {
    res.redirect("/admin/categories");
  }

  Category.findByPk(id)
    .then((category) => {
      if (category != undefined) {
        res.render("admin/categories/edit", { category });
      } else {
        res.redirect("/admin/categories");
      }
    })
    .catch(() => {
      res.redirect("/admin/categories");
    });
});

router.post("/categories/update", (req, res) => {
  const { title, id } = req.body;

  //Metodo pra atualizar, o primeiro parametro é qual campo da tabela altera e o novo conteudo
  //o segundo paramento é qual dos registros alterar
  Category.update({ title }, { where: { id } }).then(() => {
    res.redirect("/admin/categories");
  });
});

module.exports = router;

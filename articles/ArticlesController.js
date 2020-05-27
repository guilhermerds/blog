const Express = require("Express");
const router = Express.Router();
const Article = require("./Article");
const Category = require("../categories/Category");
const slugify = require("slugify");

router.get("/admin/articles", (req, res) => {
  //Criando um inner join, usa-se o include model e a tabela
  Article.findAll({ include: [{ model: Category }] }).then((articles) => {
    res.render("admin/articles/index", { articles });
  });
});

router.get("/admin/articles/new", (req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/articles/new", { categories });
  });
});

router.post("/articles/save", (req, res) => {
  const { title, body, category } = req.body;

  Article.create({
    title,
    slug: slugify(title),
    body,
    categoryId: category,
  }).then(() => {
    res.redirect("/admin/articles");
  });
});

router.post("/articles/delete", (req, res) => {
  const { id } = req.body;
  if (id != undefined && !isNaN(id)) {
    Article.destroy({ where: { id } }).then(() => {
      res.redirect("/admin/articles");
    });
  } else {
    res.redirect("/admin/articles");
  }
});

router.get("/admin/articles/edit/:id", (req, res) => {
  const { id } = req.params;

  if (!isNaN(id)) {
    Article.findByPk(id)
      .then((article) => {
        if (article != undefined) {
          Category.findAll().then((categories) => {
            res.render("admin/articles/edit", { categories, article });
          });
        } else {
          res.redirect("/");
        }
      })
      .catch(() => {
        res.redirect("/");
      });
  }
});

router.post("/articles/update", (req, res) => {
  const { id, title, body, category } = req.body;

  Article.update(
    {
      title,
      body,
      categoryId: category,
      slug: slugify(title),
    },
    {
      where: { id },
    }
  )
    .then(() => {
      res.redirect("/admin/articles");
    })
    .catch(() => {
      res.redirect("/");
    });
});

router.get("/articles/page/:num", (req, res) => {
  const { num } = req.params;

  let offset = 0;

  if (!isNaN(num) && num > 0) {
    offset = (num - 1) * 4;
  }

  Article.findAndCountAll({
    //Define quantos registros serão retornados
    limit: 4,
    //Define apartir de qual registro irá retornar
    offset,
  }).then((articles) => {
    let next = false;

    if (offset + 4 < articles.count) {
      next = true;
    }

    const result = { articles, next };

    res.json(result);
  });
});

module.exports = router;

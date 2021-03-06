const Express = require("express");
const app = Express();
const bodyParser = require("body-parser");
const session = require("express-session");
const connection = require("./database/database");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const userController = require("./users/UserController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");

//View Engine
app.set("view engine", "ejs");

//Sessions
app.use(
  session({
    //Palavra secreta para criação do hash
    secret: "FNQkw^njyHDY5qK^KY#N!qa2XzMNuX",
    //maxAge- duração de vida do cookie em ms (milisegundos)
    cookie: { maxAge: 300000000 },
    //Permite a reescrita da sessão
    resave: false,
    saveUninitialized: true,
  })
);

//Static
app.use(Express.static("public"));

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Database
connection
  .authenticate()
  .then(() => {
    console.log("Conectado com o banco de dados");
  })
  .catch((msgErr) => {
    console.log("Ocorreu um erro na conexão com o banco \n" + msgErr);
  });

//Categories, a barra na frente indica o prefixo
app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", userController);

app.get("/", (req, res) => {
  Article.findAll({ order: [["id", "DESC"]], limit: 4 }).then((articles) => {
    Category.findAll().then((categories) => {
      res.render("index", { articles, categories });
    });
  });
});

app.get("/:slug", (req, res) => {
  const { slug } = req.params;

  Article.findOne({ where: { slug } })
    .then((article) => {
      if (article != undefined) {
        Category.findAll().then((categories) => {
          res.render("article", { article, categories });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch(() => {
      res.redirect("/");
    });
});

app.get("/category/:slug", (req, res) => {
  const { slug } = req.params;
  Category.findOne({
    where: { slug },
    include: [{ model: Article }],
  })
    .then((category) => {
      if (category != undefined) {
        Category.findAll().then((categories) => {
          res.render("index", { categories, articles: category.articles });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch(() => res.redirect("/"));
});

app.listen(8080, () => {
  console.log("O servidor esta rodando");
});

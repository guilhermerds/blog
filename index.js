const Express = require("express");
const app = Express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

//View Engine
app.set("view engine", "ejs");

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

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(8080, () => {
  console.log("O servidor esta rodando");
});

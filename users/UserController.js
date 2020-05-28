const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");

router.get("/admin/users", (req, res) => {
  User.findAll().then((users) => {
    res.render("admin/users/index", { users });
  });
});

router.get("/admin/users/create", (req, res) => {
  res.render("admin/users/create");
});

router.post("/users/create", (req, res) => {
  const { email, password } = req.body;

  if (email == "" || password == "") {
    res.redirect("/admin/users/create");
  } else {
    User.findOne({ where: { email } }).then((user) => {
      if (user == undefined) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        User.create({ email, password: hash })
          .then(() => {
            res.redirect("/");
          })
          .catch(() => {
            res.redirect("/");
          });
      } else {
        res.redirect("/admin/users/create");
      }
    });
  }
});

module.exports = router;

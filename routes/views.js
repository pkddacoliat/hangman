const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("pages/index", { title: "Hangman" });
});

/* GET login page. */
router.get("/login", (req, res, next) => {
  res.render("pages/login", { title: "Hangman" });
});

module.exports = router;

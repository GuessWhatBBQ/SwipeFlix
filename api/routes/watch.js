const router = require("express").Router();
const List = require("../models/List");
const verify = require("../verifyToken");

//CREATE

router.get("/", (req, res) => {
  res.redirect("hhtp://localhost:3001");
});

module.exports = router;

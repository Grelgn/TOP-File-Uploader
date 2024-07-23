const express = require("express");
const indexController = require("../controllers/indexController");

const router = express.Router();

router.get("/", indexController.getIndex);
router.get("/signup", indexController.getSignUp);
router.get("/login", indexController.getLogIn);

module.exports = router;

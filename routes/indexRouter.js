const express = require("express");
const indexController = require("../controllers/indexController");

const router = express.Router();

router.get("/", indexController.getIndex);
router.get("/sign-up", indexController.getSignUp);
router.get("/log-in", indexController.getLogIn);

router.post("/sign-up", indexController.userSignUp);
router.post("/log-in", indexController.userLogIn);

router.get("/log-out", indexController.userLogOut);

module.exports = router;

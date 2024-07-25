const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const indexController = require("../controllers/indexController");

const router = express.Router();

router.get("/", indexController.getIndex);
router.get("/sign-up", indexController.getSignUp);
router.get("/log-in", indexController.getLogIn);

router.post("/sign-up", indexController.userSignUp);
router.post("/log-in", indexController.userLogIn);

router.get("/log-out", indexController.userLogOut);

router.post("/upload", upload.single("avatar"), indexController.userUpload);

module.exports = router;

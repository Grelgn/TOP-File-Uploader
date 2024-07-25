const express = require("express");
const driveController = require("../controllers/driveController");

const router = express.Router();

router.get("/", driveController.getDrive);
router.get("/new", driveController.getNewFolder);

router.post("/new", driveController.makeNewFolder);

module.exports = router;

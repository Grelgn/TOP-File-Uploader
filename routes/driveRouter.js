const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const driveController = require("../controllers/driveController");

const router = express.Router();

router.get("/", driveController.getDrive);
router.get("/new", driveController.getNewFolder);

router.post("/new", driveController.makeNewFolder);

router.get("/delete/:id", driveController.getDeleteFolder);
router.post("/delete/:id", driveController.deleteFolder);

router.get("/edit/:id", driveController.getEditFolder);
router.post("/edit/:id", driveController.editFolder);

router.post("/upload/:id", upload.single("avatar"), driveController.uploadFile);
router.post("/download/:id", driveController.downloadFile);

router.get("/delete-file/:id", driveController.getDeleteFile);
router.post("/delete-file/:id", driveController.deleteFile);

module.exports = router;

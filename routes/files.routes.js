const express = require("express");
const upload = require("../middlewares/upload.middleware");
const controller = require("../controllers/files.controller");

const router = express.Router();

router.post("/upload", upload.single("file"), controller.uploadFile);
router.post("/process-excel", upload.single("file"), controller.processExcel);
router.get("/getAll", controller.getAllRecords);

module.exports = router;

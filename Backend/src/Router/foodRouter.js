const express = require("express");
const foodController = require("../Controller/foodController");
const authMiddleware = require("../middleware/authMiddleware");
const userMiddleware = require("../middleware/userMiddleware");
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage()
});

const router = express.Router();

// create food api/food/create
router.post("/create", authMiddleware.authFoodPartnerMiddleware,upload.single("video"), foodController.createFood);

//getFoodItems
router.get("/get", userMiddleware.authUserMiddleware, foodController.getFoodItems);

module.exports = router
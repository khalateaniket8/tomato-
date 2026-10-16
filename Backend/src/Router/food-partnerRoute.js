const express = require("express");
const foodPartnerControllerProfile = require("../Controller/food-partnerControlllerProfile");
const userMiddleware = require("../middleware/userMiddleware");

const router = express.Router()

router.get("/:id",userMiddleware.authUserMiddleware, foodPartnerControllerProfile.getFoodPartnerById);

module.exports = router
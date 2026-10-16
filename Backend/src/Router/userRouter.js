const express = require("express");
const userController = require("../Controller/userController");
const foodPartnerController = require("../Controller/foodPartnerController");

const router = express.Router();

// user api/auth/
router.post("/register",userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/logOut", userController.logOutUser);

//foodPartner api/auth/food
router.post("/food/register", foodPartnerController.registerFoodPartner);
router.post("/food/login", foodPartnerController.loginFoodPartner);
router.get("/food/logOut", foodPartnerController.logOutFoodPartner);

module.exports = router;
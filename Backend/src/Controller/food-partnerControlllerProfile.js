const foodModel = require("../models/foodModel");
const foodPartnerModel = require("../models/foodPartner");

async function getFoodPartnerById(req, res) {
    const foodPartnerId = req.params.id;

    const foodPartner = await foodPartnerModel.findById(foodPartnerId)

    if(!foodPartner) {
        return res.status(404).json({
            message: "food partner not found"
        })
    };

    const foodItems = await foodModel.find({
        foodPartner: foodPartnerId,
    });

    res.status(200).json({
        message: "food partner retrived succesfully",
        foodPartner,
        foodItems
    });
}

module.exports = {getFoodPartnerById}
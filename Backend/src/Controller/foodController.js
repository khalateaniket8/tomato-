
const foodModel = require("../models/foodModel");
const storageServices = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
    try {

        const fileUploadResult = await storageServices.uploadFile(
            req.file.buffer.toString("base64"),
            `${uuid()}.mp4`
        );

        const foodItems = await foodModel.create({
            name: req.body.name,
            video: fileUploadResult.url,
            description: req.body.description,
            foodPartner: req.foodPartner._id
        });

        return res.status(201).json({
            message: "Food Created Successfully",
            food: foodItems
        });

    } catch (error) {
        console.error("Food creation error:", error);

        return res.status(500).json({
            message: "Food creation failed",
            error: error.message
        });
    }
}

async function getFoodItems(req, res) {
    try{
    const foodItems = await foodModel.find();

    res.status(200).json({
        message: "food fetch successfully",
        food: foodItems
    });
} catch(error) {
    return res.status(500).json({
        message: error.message
    })
}
}

module.exports = { createFood, getFoodItems }

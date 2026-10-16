const foodPartnerModel = require("../models/foodPartner");
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req, res, next) {
    const token = req.cookies.token;

    if(!token) {
        return res.status(403).json({
            "message": "Unauthorized Token"
        })
    };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const foodPartner = await foodPartnerModel.findById(decoded.id)

        req.foodPartner = foodPartner

        next()

    } catch (error) {
        res.status(403).json({
            message: "invalid token"
        })
    };
}

module.exports = {authFoodPartnerMiddleware}
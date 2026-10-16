const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

async function authUserMiddleware(req, res, next) {
    const token = req.cookies.token;

    if(!token) {
        return res.status(403).json({
            message: "Token Not Valid"
        })
    };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.id);

        req.user = user

        next()
    } catch (error) {
        console.error("invalid data");
    };
}

module.exports = {authUserMiddleware}
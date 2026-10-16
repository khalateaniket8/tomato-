const foodPartnerModel = require("../models/foodPartner");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

async function registerFoodPartner(req, res) {
    const {fullName, email, password} = req.body;

    const isfoodPartnerAlreadyExists = await foodPartnerModel.findOne({
        email
    });

    if(isfoodPartnerAlreadyExists) {
        return res.status(400).json({
            message: "User Already Exists"
        })
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
        fullName: fullName,
        email: email,
        password: hashedPassword
    });

    const token = jwt.sign({
        id: foodPartner._id
    }, process.env.JWT_SECRET);

    res.cookie("token",token);

    return res.status(201).json({
        message: "Register Successfully",
        foodPartner: {
            id: foodPartner._id,
            fullName: foodPartner.fullName,
            email: foodPartner.email
        },
        token
    })
}

async function loginFoodPartner(req, res) {
    const {email, password} = req.body;

    const foodPartner = await foodPartnerModel.findOne({
        email
    })
    .select("+password");

    if(!foodPartner) {
        return res.status(401).json({
            message: "User not available"
        })
    };

    const isValidPassword = await bcrypt.compare(password, foodPartner.password);

    if(!isValidPassword) {
        return res.status(400).json({
            message: "Password Not Valid"
        })
    };

    const token = jwt.sign({
        id: foodPartner._id 
    }, process.env.JWT_SECRET);

    res.cookie("token", token);

    return res.status(201).json({
        message: "Login Successfully",
        foodPartner: {
            id: foodPartner._id,
            fullName: foodPartner.fullName,
            email: foodPartner.email
        },
        token
    })

}

async function logOutFoodPartner(req, res) {
    res.clearCookie("token");

    res.status(200).json({
        message: "LogOut Successfully"
    });
}

module.exports = {registerFoodPartner, loginFoodPartner, logOutFoodPartner}
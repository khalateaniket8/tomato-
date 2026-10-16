const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
    const {fullName, email, password} = req.body;

    const isEmailAlreadyExist = await userModel.findOne({
        email
    });

    if(isEmailAlreadyExist) {
        return res.status(400).json({
            message: "Email Already Exists"
        });
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName: fullName,
        email: email,
        password: hashedPassword
    });

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET);

    res.cookie("token", token);

    return res.status(201).json({
        message: "Register Successfully",
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email
        },
        token
    });
}

async function loginUser(req, res) {
    const {email, password} = req.body;

    const user = await userModel.findOne({
        email
    })
    .select("+password");

    if(!user) {
        return res.status(400).json({
            message: "User Not Available"
        })
    };

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.status(400).json({
            message: "Password Not Valid"
        })
    };

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET);

    res.cookie("token", token);

    return res.status(201).json({
        message: "Login Successfully",
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email
        },
        token
    });
    
}

async function logOutUser(req, res) {
    res.clearCookie("token");

    res.status(200).json({
        message: "LogOut Successfully"
    });
}



module.exports = {registerUser, loginUser, logOutUser}
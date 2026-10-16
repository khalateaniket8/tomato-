const express = require("express");
const cookieParser = require("cookie-parser");
const router = require("./Router/userRouter");
const foodRouter = require("./Router/foodRouter");
const cors = require("cors");
const foodPartnerRoute = require("./Router/food-partnerRoute");

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", router);


//create food 
app.use("/api/food",foodRouter);

app.use("/api/food-partner", foodPartnerRoute);

module.exports = app;
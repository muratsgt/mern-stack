const express = require("express");
const app = express();

require("dotenv").config();

const connectDB = require("./models/connectDB");

const router = require("./routes/router");

connectDB();

// post edilen data bodysinde JSON data varsa, req.body nin icine koyuyor
app.use(express.json());

// send every request to router
app.use("/api", router)

// yayin yapiyoruz
app.listen(process.env.PORT, () => {
    console.log(`I am listening on port ${process.env.PORT}`)
});
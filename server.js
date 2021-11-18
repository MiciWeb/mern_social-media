const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const userRoutes = require("./routes/user.routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// routes
app.use("/api/user", userRoutes);


// server
app.listen(process.env.PORT, () => {
    console.log("listening on port " + process.env.PORT);
})


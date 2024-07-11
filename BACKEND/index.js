const express = require("express");
var cors = require("cors");
const connection = require("./connection");
require("dotenv").config();
const RouterReservation = require("./routes/transport");
const RouterUsers = require("./routes/users");
const RouterPlat = require("./routes/plat");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/transport", RouterReservation);
app.use("/users", RouterUsers);
app.use("/plat", RouterPlat);

module.exports = app;

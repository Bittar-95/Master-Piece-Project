var express = require("express");
var cors = require("cors");
var app = express();
var router = require("./routes/routers");
var bodyParses = require("body-parser");



//MiddleWare Methods
app.use(bodyParses.json());
//Middle wrae methode
app.use(express.static("public"));
// app.use("", express.static("public"));
app.use(cors());
app.use("/", router);
app.listen(9000);

// ----- Dependencies ----- //
const express = require("express");
const mongoose = require("mongoose");
const expressHandlebars = require("express-handlebars");
const bodyParser = require("body-parser");

// ----- Set PORT: host or 3000 ----- //
const PORT = process.env.PORT || 3000;

// ----- Express App Setup ----- //
const app = express();

// ----- Set up router ----- //
const router = express.Router();
require("./config/routes")(router);
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

// ----- DB Settings ----- //
const db = process.env.MONGODB_URI || "mongodb://localhost:27017/news";

mongoose.connect(db, error => {
  if (error) console.log(error);
  else console.log("mongoose connection successful");
});

// ----- Run, Listen ----- //
app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});

const SERVER_PORT = process.env.PORT || 8080;
const express = require("express");
const exphbs = require("express-handlebars");
const bodyparser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

const apiRouter = require("./api");

const app = express();
const router = express.Router();

app.use(cors());

app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main",
    extname: "hbs",
  })
);
app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(express.static("assets"));

// handle HTTP POST requests

app.use(bodyparser.json());
var jsonParser = bodyparser.json();
app.use("/api", jsonParser, apiRouter);

app.get("/", function (req, res, next) {
  res.render("home");
});

app.listen(SERVER_PORT, () => {
  console.info(`Server started at http://localhost:${SERVER_PORT}`);
});






const express = require("express");
const path = require("path");
const indexRouter = require("./routes/indexRouter");
require("dotenv").config();

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
	console.log(`My first Express app - listening on port ${PORT}!`)
);

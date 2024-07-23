const asyncHandler = require("express-async-handler");

const getIndex = asyncHandler(async (req, res) => {
	res.render("index", { title: "Homepage" });
});

const getSignUp = asyncHandler(async (req, res) => {
	res.render("signup", { title: "Sign Up" });
});

const getLogIn = asyncHandler(async (req, res) => {
	res.render("login", { title: "Log In" });
});

module.exports = { getIndex, getSignUp, getLogIn };

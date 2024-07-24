const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const getIndex = asyncHandler(async (req, res) => {
	res.render("index", { title: "Homepage", errors: null });
});

const getSignUp = asyncHandler(async (req, res) => {
	res.render("signup", { title: "Sign Up", errors: null });
});

const getLogIn = asyncHandler(async (req, res) => {
	res.render("login", { title: "Log In", errors: null });
});

const userSignUp = [
	body("username")
		.trim()
		.notEmpty()
		.escape()
		.withMessage("Username must be specified.")
		.isLength({ max: 25 })
		.withMessage("Username can't be more than 25 characters."),
	body("password")
		.trim()
		.notEmpty()
		.escape()
		.withMessage("Password must be specified.")
		.isLength({ max: 25 })
		.withMessage("Password can't be more than 25 characters."),
	body("confirm")
		.trim()
		.custom((value, { req }) => {
			return value === req.body.password;
		})
		.escape()
		.withMessage("Passwords do not match."),

	asyncHandler(async (req, res, next) => {
		// const { username, password, confirm } = req.body;
		const result = validationResult(req);
		console.log(result.errors);
		if (result.errors.length > 0) {
			res.render("signup", {
				title: "Sign Up",
				errors: result.errors,
			});
		} else {
			res.redirect("/");
		}
	}),
];

module.exports = { getIndex, getSignUp, getLogIn, userSignUp };

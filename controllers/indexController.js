const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getIndex = asyncHandler(async (req, res) => {
	res.render("index", { title: "Homepage", user: req.user });
});

const getSignUp = asyncHandler(async (req, res) => {
	res.render("signup", { title: "Sign Up", errors: null, user: req.user });
});

const getLogIn = asyncHandler(async (req, res) => {
	res.render("login", { title: "Log In", user: req.user });
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
		const result = validationResult(req);
		if (result.errors.length > 0) {
			res.render("signup", {
				title: "Sign Up",
				errors: result.errors,
			});
		} else {
			bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
				if (err) {
					return;
				} else {
					await prisma.user.create({
						data: {
							username: req.body.username,
							password: hashedPassword,
						},
					});
				}
			});
			res.redirect("/");
		}
	}),
];

const userLogIn = [
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/log-in",
	}),
];

const userLogOut = asyncHandler(async (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
});

module.exports = {
	getIndex,
	getSignUp,
	getLogIn,
	userSignUp,
	userLogIn,
	userLogOut,
};

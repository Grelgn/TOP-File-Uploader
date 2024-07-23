const asyncHandler = require("express-async-handler");

const getIndex = asyncHandler(async (req, res) => {
	res.render("index");
});

module.exports = { getIndex };

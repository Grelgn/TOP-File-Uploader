const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getDrive = asyncHandler(async (req, res) => {
	const response = await prisma.user.findFirst({
		select: {
			folders: true,
		},
		where: {
			id: req.user.id,
		},
	});

	res.render("drive", { title: "My Drive", folders: response.folders });
});

const getNewFolder = asyncHandler(async (req, res) => {
	res.render("newFolder", { title: "My Drive" });
});

const makeNewFolder = asyncHandler(async (req, res) => {
	await prisma.folder.create({
		data: {
			name: req.body.name,
			ownerId: req.user.id,
		},
	});

	res.redirect("/drive");
});

const deleteFolder = asyncHandler(async (req, res) => {
	await prisma.folder.delete({
		where: {
			id: req.params.id,
		},
	});

	res.redirect("/drive");
});

module.exports = {
	getDrive,
	getNewFolder,
	makeNewFolder,
	deleteFolder,
};

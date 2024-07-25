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

const getDeleteFolder = asyncHandler(async (req, res) => {
	const folder = await prisma.folder.findFirst({
		where: {
			id: req.params.id,
		},
	});

	res.render("deleteFolder", { title: "Delete Folder", folder: folder });
});

const deleteFolder = asyncHandler(async (req, res) => {
	await prisma.folder.delete({
		where: {
			id: req.params.id,
		},
	});

	res.redirect("/drive");
});

const getEditFolder = asyncHandler(async (req, res) => {
	const folder = await prisma.folder.findFirst({
		where: {
			id: req.params.id,
		},
	});

	res.render("editFolder", { title: "Delete Folder", folder: folder });
});

const editFolder = asyncHandler(async (req, res) => {
	await prisma.folder.update({
		where: {
			id: req.params.id,
		},
		data: {
			name: req.body.name,
		},
	});

	res.redirect("/drive");
});

module.exports = {
	getDrive,
	getNewFolder,
	makeNewFolder,
	getDeleteFolder,
	deleteFolder,
	getEditFolder,
	editFolder,
};

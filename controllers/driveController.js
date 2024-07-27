const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getDrive = asyncHandler(async (req, res) => {
	const folders = await prisma.folder.findMany({
		where: {
			ownerId: req.user.id,
		},
		include: {
			files: true,
		},
	});

	console.log(folders);
	res.render("drive", { title: "My Drive", folders: folders });
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

const uploadFile = asyncHandler(async (req, res, next) => {
	const { originalname, filename, size } = req.file;

	await prisma.file.create({
		data: {
			fileName: filename,
			originalName: originalname,
			size: size,
			folderId: req.params.id,
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
	uploadFile,
};

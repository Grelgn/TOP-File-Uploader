const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");

const prisma = new PrismaClient();
const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_API
);

const getDrive = asyncHandler(async (req, res) => {
	const folders = await prisma.folder.findMany({
		where: {
			ownerId: req.user.id,
		},
		include: {
			files: true,
		},
	});

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

	const filePath = path.join(__dirname, "..", "uploads", filename);
	const file = fs.readFileSync(filePath);

	const { data, error } = await supabase.storage
		.from("files-public")
		.upload(filename, file);
	if (error) {
		console.log(error);
	}

	fs.unlinkSync(filePath);
	
	res.redirect("/drive");
});

const downloadFile = asyncHandler(async (req, res, next) => {
	const { fileName, originalName } = await prisma.file.findFirst({
		where: {
			id: req.params.id,
		},
	});

	const filePath = path.join(__dirname, "..", "uploads", fileName);

	res.download(filePath, originalName);
});

const getDeleteFile = asyncHandler(async (req, res) => {
	const file = await prisma.file.findFirst({
		where: {
			id: req.params.id,
		},
	});

	res.render("deleteFile", { title: "Delete File", file: file });
});

const deleteFile = asyncHandler(async (req, res, next) => {
	const { id } = await prisma.file.delete({
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
	getDeleteFolder,
	deleteFolder,
	getEditFolder,
	editFolder,
	uploadFile,
	downloadFile,
	getDeleteFile,
	deleteFile,
};

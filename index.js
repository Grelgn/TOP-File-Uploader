const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
	// ... you will write your Prisma Client queries here
	const response = await prisma.session.findMany();
	console.log(response);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

import { faker } from '@faker-js/faker';
import { PrismaClient, Team, TeamMatch, User } from '../src/generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
	await clearDB();

	await seedEvent();
	await seedTeams();
}

async function seedEvent() {
	await prisma.event.create({
		data: {
			stream_url: 'https://www.youtube.com/flamingchickens1540'
		}
	});
}

async function seedTeams() {
	const teams: Team[] = [];
	for (let i = 1100; i <= 1116; i++) {
		teams.push({
			key: i,
			name: faker.commerce.productName() + 's',
			summary: null,
			scoreRobot: null,
			scoreGrass: null,
			scoreFeedingStation: null,
			scoreCabbage: null,
			drivetrain: null
		});
	}
	return await prisma.team.createMany({ data: teams });
}

async function clearDB() {
	await prisma.user.deleteMany();
	await prisma.teamMatch.deleteMany();
	await prisma.team.deleteMany();
	await prisma.event.deleteMany();
}

await main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

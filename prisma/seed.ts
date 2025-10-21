import { PrismaClient, Event, TeamMatch, Team } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
	await clearDB();

	await seedEvent();
	await seedUsers();
	await seedTeams();
	// await seedTeamMatches();
}

async function seedEvent() {
	await prisma.event.create({
		data: {
			event_key: 'https://www.youtube.com/flamingchickens1540'
		}
	});
}

async function seedUsers() {
	// WARNING Seeding users causes unique key
	// constrait bugs when creating new ones
	//
	// const users: User[] = []
	// users.push({
	//     id: 0,
	//     username: "admin",
	//     is_enabled: true,
	//     is_admin: true,
	// })
	// for (let i = 1; i <= 9; i++) {
	//     users.push({
	//         id: i,
	//         username: faker.person.firstName(),
	//         is_enabled: faker.number.int(100) > 30,
	//         is_admin: false,
	//     })
	// }
	// await prisma.user.createMany({ data: users })
	//
	// return await prisma.user.findMany()
}

async function seedTeams() {
	const teams: Team[] = [];
	for (let i = 1100; i <= 1116; i++) {
		teams.push({
			key: i,
			name: faker.commerce.productName() + 's'
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

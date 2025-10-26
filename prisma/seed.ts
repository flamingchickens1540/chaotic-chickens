import { faker } from '@faker-js/faker';
import { PrismaClient, Team, TeamMatch, User } from '../src/generated/prisma/client';
import { info, warn } from 'console';

import team_mappings from '../teams.json';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function main() {
	await clearDB();
	await seedTeams();
}

async function seedTeams() {
	const res = await fetch(`https://www.thebluealliance.com/api/v3/event/2025orbb/teams/simple`, {
		method: 'GET',
		headers: {
			'If-None-Match': 'ETag',
			Accept: 'application/json',
			'X-TBA-Auth-Key': process.env.API_KEY ?? ''
		}
	});
	if (!res.ok) {
		warn(`Error finding teams for event 2025orbb: ${res.status}`);
		return await seedFakeTeams();
	}

	const teams: { team_number: number; nickname: string }[] = await res.json();
	if (!teams.length) {
		info(`Teams for event 2025orbb are not yet available. Generating fake data instead`);
		return await seedFakeTeams();
	}

	const modified_teams = teams.map((team) => {
		return (
			team_mappings.find((mapping) => mapping.official_key == team.team_number)?.team ?? {
				key: team.team_number.toString(),
				name: team.nickname
			}
		);
	});
	return await prisma.team.createMany({ data: modified_teams });
}

async function seedFakeTeams() {
	const teams: { key: string; name: string }[] = [];

	for (let i = 1100; i <= 1116; i++) {
		teams.push({
			key: i.toString(),
			name: faker.commerce.productName() + 's'
		});
	}
	return await prisma.team.createMany({ data: teams });
}

async function clearDB() {
	await prisma.user.deleteMany();
	await prisma.teamMatch.deleteMany();
	await prisma.team.deleteMany();
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

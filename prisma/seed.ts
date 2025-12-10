import { faker } from '@faker-js/faker';
import { PrismaClient } from '../src/generated/prisma/client';
import { info, warn } from 'console';

import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function main() {
	await clearDB();
	await seedTeams();
}

async function seedTeams() {
	const resEvent = await fetch(`https://www.thebluealliance.com/api/v3/event/2025orbb`, {
		method: 'GET',
		headers: {
			'If-None-Match': 'ETag',
			Accept: 'application/json',
			'X-TBA-Auth-Key': process.env.API_KEY ?? ''
		}
	});
	const resTeams = await fetch(
		`https://www.thebluealliance.com/api/v3/event/2025orbb/teams/simple`,
		{
			method: 'GET',
			headers: {
				'If-None-Match': 'ETag',
				Accept: 'application/json',
				'X-TBA-Auth-Key': process.env.API_KEY ?? ''
			}
		}
	);
	if (!resEvent.ok) {
		warn(`Error finding event 2025orbb: ${resEvent.status}`);
		return await seedFakeTeams();
	}
	if (!resTeams.ok) {
		warn(`Error finding teams for event 2025orbb: ${resTeams.status}`);
		return await seedFakeTeams();
	}

	const mappings = (await resEvent.json()).remap_teams;

	const teams: { nickname: string; key: string }[] = await resTeams.json();
	if (!teams.length) {
		info(`Teams for event 2025orbb are not yet available. Generating fake data instead`);
		return await seedFakeTeams();
	}

	const all_remapped = Object.fromEntries(
		Object.entries(mappings)
			.map(([key, value]) => [key, String(value)])
			.map(([key, value]) => [
				[key, value],
				[value.slice(0, value.length - 1), value.slice(0, value.length - 1) + 'A']
			])
			.flat(1)
	);

	console.log(all_remapped);
	const modified_teams = teams.map((team) => {
		const remapped_key: string | undefined = all_remapped[team.key];
		if (!remapped_key) {
			return {
				key: team.key.slice(3),
				name: team.nickname
			};
		}
		const name: string | undefined =
			teams.find((team) => team.key == remapped_key.slice(0, remapped_key.length - 1))?.nickname +
			' ' +
			remapped_key.slice(remapped_key.length - 1);
		if (!name) {
			warn(`secondary team found without their primary team: ${remapped_key}`);
			return {
				key: team.key.slice(3),
				name: team.nickname
			};
		}
		return {
			key: remapped_key.slice(3),
			name
		};
	});
	return await prisma.team.createMany({ data: modified_teams });
}

async function seedFakeTeams() {
	const teams: { key: string; name: string }[] = [];

	for (let i = 1100; i <= 1116; i++) {
		teams.push({
			key: 'frc' + i.toString(),
			name: faker.commerce.productName() + 's'
		});
	}
	return await prisma.team.createMany({ data: teams });
}

async function clearDB() {
	await prisma.teamMatch.deleteMany();
	await prisma.user.deleteMany();
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

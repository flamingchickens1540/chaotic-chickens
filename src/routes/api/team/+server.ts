import { prisma } from '$lib/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';
import type { Team } from '../../../generated/prisma/browser';

export const POST: RequestHandler = async ({ request }: any) => {
	const team: Team = await request.json();
	return json(
		await prisma.team.update({
			where: {
				key: team.key
			},
			data: {
				...team
			}
		})
	);
};

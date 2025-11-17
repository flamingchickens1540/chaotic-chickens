import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/prisma";

// TODO: Teams and status from the database
export const load: PageServerLoad = async ({ params }) => {
	const teams = await prisma.team.findMany({
		select: {
			key: true,
			scoreBunny: true,
			scoreCabbage: true,
			scoreFeedingStation: true,
			scoreGrass: true,
			scoreRobot: true,
		},
	});

	return {
		teams,
	};
};

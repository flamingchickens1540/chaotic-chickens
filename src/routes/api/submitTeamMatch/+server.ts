import { prisma } from '$lib/prisma';
import type { FrontendTeamMatch } from '$lib/types';
import type { TeamMatch } from '../../../generated/prisma/browser';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }: any) => {
	const match: FrontendTeamMatch = await request.json();
	const counted: Omit<TeamMatch, 'idNum'> = {
		autoScoreGrass: match.timeline.auto.filter((action) => action == 'ScoreGrass').length,
		autoScoreFeedingStation: match.timeline.auto.filter((action) => action == 'ScoreFeedingStation')
			.length,
		teleScoreGrass: match.timeline.tele.filter((action) => action == 'ScoreGrass').length,
		teleScoreFeedingStation: match.timeline.tele.filter((action) => action == 'ScoreFeedingStation')
			.length,
		teleScoreRobot: match.timeline.tele.filter((action) => action == 'ScoreRobot').length,
		centerAuto: match.autoStart == 'Mid',
		teleActions: match.timeline.tele,
		autoActions: match.timeline.auto,
		...match
	};
	const res = await prisma.teamMatch.create({ data: counted });
	return json(res);
};

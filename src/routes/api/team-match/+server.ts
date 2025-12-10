import { prisma } from '$lib/prisma';
import type { FrontendTeamMatch } from '$lib/types';
import type { Action, TeamMatch } from '../../../generated/prisma/browser';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }: any) => {
	const { scout, autoStart, timeline, ...match }: FrontendTeamMatch = await request.json();
	const counted: Omit<TeamMatch, 'idNum'> = {
		autoScoreGrass: countTeamMatch(timeline.auto, 'ScoreGrass'),
		autoScoreFeedingStation: countTeamMatch(timeline.auto, 'ScoreFeedingStation'),
		teleScoreGrass: countTeamMatch(timeline.tele, 'ScoreGrass'),
		teleScoreFeedingStation: countTeamMatch(timeline.tele, 'ScoreFeedingStation'),
		teleScoreRobot: countTeamMatch(timeline.tele, 'ScoreRobot'),
		teleScoreBunny: countTeamMatch(timeline.tele, 'ScoreBunny'),
		centerAuto: autoStart == 'Mid',
		teleActions: timeline.tele,
		autoActions: timeline.auto,
		scoutName:
			(
				await prisma.user.findUnique({
					where: { id: match.scoutId },
					select: { username: true }
				})
			)?.username ?? 'Invalid',
		...match
	};
	const res = await prisma.teamMatch.create({ data: counted });
	return json(res);
};

function countTeamMatch(actions: Action[], comparedAction: Action) {
	return actions.filter((action) => action == comparedAction).length;
}

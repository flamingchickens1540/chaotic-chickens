import { prisma } from '$lib/prisma';
import type { FrontendTeamMatch } from '$lib/types';
import type { Action, TeamMatch } from '../../../generated/prisma/browser';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }: any) => {
	const match: FrontendTeamMatch = await request.json();
	const counted: Omit<TeamMatch, 'idNum'> = {
		autoScoreGrass: countTeamMatch(match.timeline.auto, 'ScoreGrass'),
		autoScoreFeedingStation: countTeamMatch(match.timeline.auto, 'ScoreFeedingStation'),
		teleScoreGrass: countTeamMatch(match.timeline.tele, 'ScoreGrass'),
		teleScoreFeedingStation: countTeamMatch(match.timeline.tele, 'ScoreFeedingStation'),
		teleScoreRobot: countTeamMatch(match.timeline.tele, 'ScoreRobot'),
		teleScoreBunny: countTeamMatch(match.timeline.tele, 'ScoreBunny'),
		centerAuto: match.autoStart == 'Mid',
		teleActions: match.timeline.tele,
		autoActions: match.timeline.auto,
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

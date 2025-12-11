import { prisma } from '$lib/prisma';
import type { FrontendTeamMatch } from '$lib/types';
import { error, info } from 'console';
import type { Action, TeamMatch } from '../../../generated/prisma/browser';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }: any) => {
	const req: FrontendTeamMatch = await request.json();
	try {
		const { scout, autoStart, timeline, ...match } = req;
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
		info(res);
		return json(res);
	} catch (err: any) {
		error(`error while submitting match: \n${err}\nMatch data:`);
		error(req);
		return error(500, err);
	}
};

function countTeamMatch(actions: Action[], comparedAction: Action) {
	return actions.filter((action) => action == comparedAction).length;
}

import type { Action } from '../generated/prisma/client';

export type FrontendTeamMatch = {
	matchKey: number;
	teamKey: string;
	timeline: {
		auto: Action[];
		tele: Action[];
	};
	autoStart: AutoStart;
	autoMobility: boolean;
	skill: 1 | 2 | 3 | 4 | 5;
	notes: string;
	scoutId: number;
	scout: string;
};

export type AutoStart = 'Close' | 'Mid' | 'Far';

export type { Team as TeamData, Action } from '../generated/prisma/client';

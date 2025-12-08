import type { Action } from '../generated/prisma/client';

export type FrontendTeamMatch = {
	matchKey: string;
	eventKey: string;
	teamKey: string;
	timeline: Timeline;
	autoStart: AutoStart;
	autoMobility: boolean;
	skill: 1 | 2 | 3 | 4 | 5;
	notes: string;
	scoutId: number;
	scout: string;
};

export type Timeline = {
	auto: Action[];
	tele: Action[];
};

export type AutoStart = 'Close' | 'Mid' | 'Far';

export type { Team as TeamData, Action } from '../generated/prisma/client';

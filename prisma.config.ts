import type { PrismaConfig } from 'prisma';

import 'dotenv/config';

export default {
	schema: './prisma/',
	migrations: {
		seed: 'bun ./prisma/seed.ts',
		path: './prisma/migrations/'
	}
} satisfies PrismaConfig;

import type { PrismaConfig } from 'prisma';

import 'dotenv/config';

export default {
	schema: 'prisma/schema/schema.prisma'
} satisfies PrismaConfig;

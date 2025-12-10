import { PrismaClient } from '../generated/prisma/client';
import 'dotenv/config';
export const prisma: PrismaClient = new PrismaClient();

-- AlterEnum
ALTER TYPE "Action" ADD VALUE 'ScoreBunny';

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "scoreBunny" BOOLEAN;

-- CreateEnum
CREATE TYPE "AutoStart" AS ENUM ('Far', 'Close', 'Mid');

-- CreateEnum
CREATE TYPE "Drivetrain" AS ENUM ('Swerve', 'Tank', 'Other');

-- CreateEnum
CREATE TYPE "Action" AS ENUM ('ScoreGrass', 'ScoreFeedingStation', 'ScoreRobot');

-- CreateTable
CREATE TABLE "Team" (
    "key" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "summary" TEXT,
    "scoreRobot" BOOLEAN,
    "scoreGrass" BOOLEAN,
    "scoreFeedingStation" BOOLEAN,
    "scoreCabbage" BOOLEAN,
    "drivetrain" "Drivetrain"
);

-- CreateTable
CREATE TABLE "Auto" (
    "id" SERIAL NOT NULL,
    "mobility" BOOLEAN NOT NULL,
    "location" "AutoStart" NOT NULL,
    "scoreGrass" INTEGER NOT NULL,
    "scoreFeedingStation" INTEGER NOT NULL,
    "teamKey" INTEGER,

    CONSTRAINT "Auto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMatch" (
    "idNum" SERIAL NOT NULL,
    "matchKey" INTEGER NOT NULL,
    "teamKey" INTEGER NOT NULL,
    "teleActions" "Action"[],
    "autoActions" "Action"[],
    "centerAuto" BOOLEAN NOT NULL,
    "autoMobility" BOOLEAN NOT NULL,
    "autoScoreGrass" INTEGER NOT NULL,
    "autoScoreFeedingStation" INTEGER NOT NULL,
    "teleScoreGrass" INTEGER NOT NULL,
    "teleScoreFeedingStation" INTEGER NOT NULL,
    "teleScoreRobot" INTEGER NOT NULL,
    "skill" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "scoutId" INTEGER NOT NULL,

    CONSTRAINT "TeamMatch_pkey" PRIMARY KEY ("idNum")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_key_key" ON "Team"("key");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMatch_matchKey_teamKey_key" ON "TeamMatch"("matchKey", "teamKey");

-- AddForeignKey
ALTER TABLE "Auto" ADD CONSTRAINT "Auto_teamKey_fkey" FOREIGN KEY ("teamKey") REFERENCES "Team"("key") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMatch" ADD CONSTRAINT "TeamMatch_teamKey_fkey" FOREIGN KEY ("teamKey") REFERENCES "Team"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMatch" ADD CONSTRAINT "TeamMatch_scoutId_fkey" FOREIGN KEY ("scoutId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

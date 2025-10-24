/*
  Warnings:

  - You are about to drop the column `uuid` on the `User` table. All the data in the column will be lost.
  - Added the required column `scoutName` to the `TeamMatch` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."User_uuid_key";

-- AlterTable
ALTER TABLE "TeamMatch" ADD COLUMN     "scoutName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "uuid";

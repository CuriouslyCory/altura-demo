/*
  Warnings:

  - You are about to drop the column `Session` on the `Character` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "Session",
ADD COLUMN     "session" TEXT;

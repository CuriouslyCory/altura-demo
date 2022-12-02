/*
  Warnings:

  - You are about to drop the column `hp` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `mp` on the `Character` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "hp",
DROP COLUMN "mp",
ADD COLUMN     "currentHp" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "currentMp" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "maxHp" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "maxMp" INTEGER NOT NULL DEFAULT 0;

/*
  Warnings:

  - A unique constraint covering the columns `[walletAddress]` on the table `Character` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Character_walletAddress_key" ON "Character"("walletAddress");

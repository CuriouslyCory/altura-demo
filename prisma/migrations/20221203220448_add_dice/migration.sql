-- CreateTable
CREATE TABLE "DiceSide" (
    "id" TEXT NOT NULL,
    "tokenId" INTEGER NOT NULL,
    "diceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DiceSide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dice" (
    "id" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "diceIndex" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DiceSide" ADD CONSTRAINT "DiceSide_diceId_fkey" FOREIGN KEY ("diceId") REFERENCES "Dice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dice" ADD CONSTRAINT "Dice_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

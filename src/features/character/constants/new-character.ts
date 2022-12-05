export const diceTemplate = {
  sides: {
    create: [
      { tokenId: 2 },
      { tokenId: 3 },
      { tokenId: 4 },
      { tokenId: 2 },
      { tokenId: 3 },
      { tokenId: 4 },
    ],
  },
};

export const newCharacterTemplate = {
  name: "",
  maxHp: 10,
  currentHp: 10,
  maxMp: 0,
  currentMp: 0,
  exp: 0,
} as const;

export const diceTemplate = {
  sides: {
    create: [
      { tokenId: 1 },
      { tokenId: 2 },
      { tokenId: 3 },
      { tokenId: 1 },
      { tokenId: 2 },
      { tokenId: 3 },
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

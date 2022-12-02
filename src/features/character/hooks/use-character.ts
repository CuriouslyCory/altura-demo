import type { Character } from "@prisma/client";
import { useCallback } from "react";
import type { ZeroXAddress } from "../../../types/zero-x-address";
import { trpc } from "../../../utils/trpc";
import { useAuthContext } from "../../auth/hooks/use-auth-context";

type CharacterUpdateFn = {
  setName: (name: string) => Promise<Character> | undefined;
  setHp: (hp: number) => void;
  setMaxHp: (maxHp: number) => void;
  setMp: (mp: number) => void;
  setMaxMp: (maxMp: number) => void;
  setXp: (xp: number) => void;
};

export const useCharacter = (walletAddress: ZeroXAddress) => {
  const utils = trpc.useContext().character;
  const { session } = useAuthContext();

  const { data: character } = trpc.character.get.useQuery({
    walletAddress,
  });

  const updateNameMutation = trpc.character.updateName.useMutation({
    onSuccess: () => utils.get.invalidate({ walletAddress }),
  });

  const setName = useCallback(
    (name: string, onSuccess?: () => void) => {
      if (!session) return;
      console.log("setName", name);
      return updateNameMutation
        .mutateAsync({
          name,
          walletAddress,
          session: session,
        })
        .then((character: Character) => {
          onSuccess?.();
          return character;
        });
    },
    [updateNameMutation, session, walletAddress]
  );

  const setHp = (hp: number) => {};
  const setMaxHp = (maxHp: number) => {};
  const setMp = (mp: number) => {};
  const setMaxMp = (maxMp: number) => {};
  const setXp = (xp: number) => {};

  return {
    ...character,
    setName,
    setHp,
    setMaxHp,
    setMp,
    setMaxMp,
    setXp,
  };
};

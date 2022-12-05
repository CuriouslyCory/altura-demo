import { useAuthContext } from "../../auth/hooks/use-auth-context";
import { useCharacter } from "../hooks/use-character";
import { DiceConfig } from "./dice-config";

export const DiceManager = (): JSX.Element => {
  const { walletAddress } = useAuthContext();
  const { abilities, dice } = useCharacter(walletAddress ?? "0x");

  return (
    <>
      <div className="flex flex-col items-center justify-center pb-3 text-2xl">
        <h2>Dice</h2>
      </div>
      <div className="flex w-full justify-around">
        {dice?.map((die) => (
          <DiceConfig key={`dice-manager-die-${die.id}`} die={die} />
        ))}
      </div>
      <div className="flex w-full justify-around">
        <ul>
          {abilities?.map((ability, index) => (
            <li key={`abilitylist-${ability.tokenId}-${index}`}>
              {ability.name} - {ability.userBalance}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

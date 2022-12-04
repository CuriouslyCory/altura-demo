import { useAuthContext } from "../../auth/hooks/use-auth-context";
import { useCharacter } from "../hooks/use-character";

export const DiceManager = (): JSX.Element => {
  const { walletAddress } = useAuthContext();
  const { abilities, dice } = useCharacter(walletAddress ?? "0x");

  return (
    <>
      <div className="flex flex-col items-center justify-center pb-3 text-2xl">
        <h2>Dice</h2>
      </div>
      <div className="flex w-full justify-around">
        <div className="flex h-24 w-24 items-center justify-around rounded-md border-2 border-slate-700">
          {dice?.[0]?.sides.map((side) => (
            <span key={`dice-1-sides-${side.id}`}>{side.tokenId}</span>
          ))}
        </div>
        <div className="flex h-24 w-24 items-center justify-around rounded-md border-2 border-slate-700">
          {dice?.[0]?.sides.map((side) => (
            <span key={`dice-1-sides-${side.id}`}>{side.tokenId}</span>
          ))}
        </div>
        <div className="flex h-24 w-24 items-center justify-around rounded-md border-2 border-slate-700">
          {dice?.[0]?.sides.map((side) => (
            <span key={`dice-1-sides-${side.id}`}>{side.tokenId}</span>
          ))}
        </div>
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

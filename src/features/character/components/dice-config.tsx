import type { Dice, DiceSide } from "@prisma/client";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { trpc } from "../../../utils/trpc";

type DiceConfigProps = {
  die:
    | (Dice & {
        sides: DiceSide[];
      })
    | undefined;
};

export const DiceConfig = ({ die }: DiceConfigProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: tokenData } = trpc.altura.getItems.useQuery({
    itemIds: die?.sides.map((side) => side.tokenId) ?? [],
  });

  useEffect(() => {
    console.log("tokenData", tokenData);
  }, [tokenData]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const getItemName = useCallback(
    (tokenId: number) => {
      if (!tokenData) return;
      return tokenData?.find((item) => item.tokenId === tokenId)?.name;
    },
    [tokenData]
  );

  return (
    <>
      <div
        key={`dice-manager-die-${die?.id}`}
        className="flex h-24 w-24 items-center justify-around rounded-md border-2 border-slate-700"
        onClick={handleClick}
      >
        {die?.sides?.map((side) => (
          <span key={`dice-1-sides-${side.id}`}>{side.tokenId}</span>
        ))}
      </div>
      <div
        className={clsx("modal top-0 right-0 w-full", {
          "modal-open": !isOpen,
        })}
      >
        <div className="modal-box">
          <label
            onClick={handleClick}
            className="btn-sm btn-circle btn absolute right-2 top-2"
          >
            ✕
          </label>
          <div className=" grid grid-cols-4 grid-rows-3 gap-1">
            <div className="die col-start-3 col-end-3 row-start-1 row-end-1">
              <div className="die-content">
                <span>{getItemName(die?.sides[0]?.tokenId ?? 0)}</span>
              </div>
            </div>
            <div className="die col-start-1 col-end-1 row-start-2 row-end-2">
              <div className="die-content">
                <span>{getItemName(die?.sides[1]?.tokenId ?? 0)}</span>
              </div>
            </div>
            <div className="die col-start-2 col-end-2 row-start-2 row-end-2">
              <div className="die-content">
                <span>{getItemName(die?.sides[2]?.tokenId ?? 0)}</span>
              </div>
            </div>
            <div className="die col-start-3 col-end-3 row-start-2 row-end-2">
              <div className="die-content">
                <span>{getItemName(die?.sides[3]?.tokenId ?? 0)}</span>
              </div>
            </div>
            <div className="die col-start-4 col-end-4 row-start-2 row-end-2">
              <div className="die-content">
                <span>{getItemName(die?.sides[4]?.tokenId ?? 0)}</span>
              </div>
            </div>
            <div className="die col-start-3 col-end-3 row-start-3 row-end-3">
              <div className="die-content">
                <span>{getItemName(die?.sides[5]?.tokenId ?? 0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

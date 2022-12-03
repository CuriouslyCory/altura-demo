export const DiceManager = (): JSX.Element => {
  return (
    <>
      <div className="flex flex-col items-center justify-center pb-3 text-2xl">
        <h2>Dice</h2>
      </div>
      <div className="flex w-full justify-around">
        <div className="flex h-24 w-24 items-center justify-around rounded-md border-2 border-slate-700">
          Ability goes here
        </div>
        <div className="flex h-24 w-24 items-center justify-around rounded-md border-2 border-slate-700">
          Ability goes here
        </div>
        <div className="flex h-24 w-24 items-center justify-around rounded-md border-2 border-slate-700">
          Ability goes here
        </div>
      </div>
    </>
  );
};

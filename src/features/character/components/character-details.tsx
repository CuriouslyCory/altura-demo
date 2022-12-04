import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { HiOutlineUser } from "react-icons/hi";
import { useZodForm } from "../../../components/zod-form/use-zod-form";
import { useAuthContext } from "../../auth/hooks/use-auth-context";
import { useCharacter } from "../hooks/use-character";
import clsx from "clsx";
import { Toast } from "../../../components/toast/toast";
import {
  GiBroadsword,
  GiDiceShield,
  GiBubblingFlask,
  GiChest,
  GiDiceFire,
  GiBandageRoll,
} from "react-icons/gi";
import { DiceManager } from "./dice-manager";

export const characterValidationSchema = z.object({
  name: z.string().min(1).max(40),
});

export const CharacterDetails = (): JSX.Element => {
  const { walletAddress } = useAuthContext();
  const { name, setName } = useCharacter(walletAddress ?? "0x");
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const { reset, handleSubmit, formState, register } = useZodForm({
    schema: characterValidationSchema,
    defaultValues: useMemo(() => ({ name }), [name]),
  });

  useEffect(() => {
    if (!name || !reset) return;
    reset({ name });
  }, [name, reset]);

  const updateNameSuccess = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  return (
    <div className="">
      <button
        tabIndex={0}
        className="py-1 px-3 text-4xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        <HiOutlineUser />
      </button>
      <div
        tabIndex={0}
        className={clsx(
          "border-grey-500 absolute right-0 mt-3 rounded-md border bg-slate-300 p-5 transition-all duration-500 ease-in-out",
          {
            hidden: !isOpen,
          }
        )}
      >
        <div className="relative right-0">
          <h2 className="text-2xl">Character Info</h2>
          <form
            onSubmit={handleSubmit(async (values) => {
              await setName(values.name, updateNameSuccess);
            })}
          >
            <input
              className="input-bordered input my-5"
              {...register("name")}
            />
            <button type="submit" className="btn-primary btn ml-5">
              Update Name
            </button>
            {formState.errors.name?.message && (
              <p className="text-red-700">{formState.errors.name?.message}</p>
            )}
          </form>
          <DiceManager />
        </div>
      </div>
      <Toast
        message="Name updated successfully"
        type="success"
        showToast={showToast}
      />
    </div>
  );
};

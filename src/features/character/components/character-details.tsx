import { useEffect, useState } from "react";
import { z } from "zod";
import { HiOutlineUser } from "react-icons/hi";
import { useZodForm } from "../../../components/zod-form/use-zod-form";
import { useAuthContext } from "../../auth/hooks/use-auth-context";
import { useCharacter } from "../hooks/use-character";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { Toast } from "../../../components/toast/toast";

export const characterValidationSchema = z.object({
  name: z.string().min(1).max(40),
});

export const CharacterDetails = (): JSX.Element => {
  const { walletAddress } = useAuthContext();
  const { name, setName } = useCharacter(walletAddress ?? "0x");
  const [isOpen, setIsOpen] = useState(true);
  const { setValue } = useForm();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!name) return;
    setValue("name", name);
  }, [name, setValue]);

  const methods = useZodForm({
    schema: characterValidationSchema,
    defaultValues: {
      name: name,
    },
  });

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
          "border-grey-500 absolute right-0 rounded-md border p-5 transition-all duration-500 ease-in-out mt-3 bg-slate-300",
          {
            hidden: !isOpen,
          }
        )}
      >
        <div className="relative right-0">
          <h2 className="text-2xl">Character Info</h2>
          <form
            onSubmit={methods.handleSubmit(async (values) => {
              await setName(values.name, updateNameSuccess);
            })}
          >
            <input
              className="input-bordered input my-5"
              placeholder={name || "Enter your name"}
              {...methods.register("name")}
            />
            <button type="submit" className="btn-primary btn ml-5">
              Update Name
            </button>
            {methods.formState.errors.name?.message && (
              <p className="text-red-700">
                {methods.formState.errors.name?.message}
              </p>
            )}
          </form>
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

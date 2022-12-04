import type { Character } from "@prisma/client";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { createContext, useContext, useState } from "react";
import type { ZeroXAddress } from "../../../types/zero-x-address";
import { trpc } from "../../../utils/trpc";

export type AuthContextValues = {
  session?: string;
  walletAddress?: ZeroXAddress;
  isAuthenticated: boolean;
  handleLogin: (address: ZeroXAddress, alturaGuard: string) => void;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContextValues | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [state, setState] = useState<Partial<AuthContextValues>>();

  // loads state from localstorage on mount
  useEffect(() => {
    const state = localStorage.getItem("authContext");
    if (!state) return;
    setState(JSON.parse(state));
  }, []);

  // save auth context to localstorage
  const saveAuthContext = (newState: Partial<AuthContextValues>) => {
    window.localStorage.setItem("authContext", JSON.stringify(newState) ?? "");
  };

  const verifiyAlturaGuard = trpc.altura.verifyAultraGuard.useMutation();

  const handleLogin = (
    address: ZeroXAddress,
    alturaGuard: string,
    onLogin?: () => void
  ) => {
    verifiyAlturaGuard
      .mutateAsync({ address: address, alturaGuard: alturaGuard })
      .then((authResponse: Character) => {
        const newState = {
          ...state,
          walletAddress: address,
          isAuthenticated: !!authResponse,
          session: authResponse.session ?? "",
        };
        setState(newState);
        saveAuthContext(newState);
        onLogin?.();
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const handleLogout = () => {
    const newState = {
      ...state,
      isAuthenticated: false,
      session: undefined,
      walletAddress: undefined,
    };
    setState(newState);
    saveAuthContext(newState);
  };

  return (
    <AuthContext.Provider
      value={{
        session: state?.session,
        isAuthenticated: state?.isAuthenticated ?? false,
        walletAddress: state?.walletAddress,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const authContextValues = useContext(AuthContext);

  return useMemo(() => {
    return { ...authContextValues };
  }, [authContextValues]);
};

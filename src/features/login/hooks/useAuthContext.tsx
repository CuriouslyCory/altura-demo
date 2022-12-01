import type { ReactNode } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { createContext, useContext, useState } from "react";
import { trpc } from "../../../utils/trpc";

export type AuthContextValues = {
  authKey?: string;
  isAuthenticated: boolean;
  handleLogin: (address: string, alturaGuard: string) => void;
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
    console.log("found state in localstorage", state);
    if (!state) return;
    setState(JSON.parse(state));
  }, []);

  // save auth context to localstorage
  const saveAuthContext = (newState: Partial<AuthContextValues>) => {
    window.localStorage.setItem("authContext", JSON.stringify(newState) ?? "");
  };

  const verifiyAlturaGuard = trpc.altura.verifyAultraGuard.useMutation();

  const handleLogin = (
    address: string,
    alturaGuard: string,
    onLogin?: () => void
  ) => {
    verifiyAlturaGuard
      .mutateAsync({ address: address, alturaGuard: alturaGuard })
      .then((resp: boolean) => {
        console.log("is this authenticated?", resp);
        const newState = {
          ...state,
          isAuthenticated: resp,
          authKey: `${resp}`,
        };
        setState(newState);
        saveAuthContext(newState);
        onLogin?.();
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        authKey: state?.authKey,
        isAuthenticated: state?.isAuthenticated ?? false,
        handleLogin,
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

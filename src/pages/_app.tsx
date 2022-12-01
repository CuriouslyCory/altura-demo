import { type AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { AuthContextProvider } from "../features/login/hooks/useAuthContext";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />;
    </AuthContextProvider>
  );
};

export default trpc.withTRPC(MyApp);

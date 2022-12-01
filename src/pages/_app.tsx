import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";
import { AuthContextProvider } from "../features/auth/hooks/useAuthContext";
import { Layout } from "../features/layout/components/layout";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </AuthContextProvider>
  );
};

export default trpc.withTRPC(MyApp);

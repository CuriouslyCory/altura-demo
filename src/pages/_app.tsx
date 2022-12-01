import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";
import { AuthContextProvider } from "../features/auth/hooks/useAuthContext";
import { Layout } from "../features/layout/components/layout";

import "../styles/globals.css";
import { QueryClientProvider, useQueryClient } from "@tanstack/react-query";

const MyApp: AppType = ({ Component, pageProps }) => {
  const queryClient = useQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />;
        </Layout>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default trpc.withTRPC(MyApp);

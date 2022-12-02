import Head from "next/head";
import type { ReactNode } from "react";
import { mainTitle } from "../../../constants/title";
import LoginModal from "../../auth/components/login-modal";
import { Footer } from "./footer";
import { Header } from "./header";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>{mainTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginModal />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
};

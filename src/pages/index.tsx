import { type NextPage } from "next";
import Head from "next/head";
import { useAuthContext } from "../features/auth/hooks/useAuthContext";

const Home: NextPage = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <>
      <Head>
        <title>Altura NFT Game - Home</title>
        <meta
          name="description"
          content="Game developed using create-t3-app and Altura Nfts"
        />
      </Head>

      <main className="container mx-auto flex min-h-screen flex-col items-center p-4">
        <div className="flex flex-col">
          <h1 className="text-5xl">Welcome to Altura Nft Game</h1>
          {isAuthenticated && <h2>You&apos;re logged in</h2>}
        </div>
      </main>
    </>
  );
};

export default Home;

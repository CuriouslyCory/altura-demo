import { type NextPage } from "next";
import Head from "next/head";
import { mainTitle } from "../constants/title";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{mainTitle} - Home</title>
        <meta
          name="description"
          content="Game developed using create-t3-app and Altura Nfts"
        />
      </Head>

      <main className="container mx-auto flex min-h-screen flex-col items-center p-4">
        <div className="flex flex-col">
          <h1 className="text-5xl">Welcome to {mainTitle}</h1>
        </div>
      </main>
    </>
  );
};

export default Home;

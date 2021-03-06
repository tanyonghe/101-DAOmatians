import Head from "next/head";
import Hero from "../components/Layout/Hero";
import Layout from "../components/Layout/Layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Hack and Roll 2022</title>
        <meta name="description" content="Done for Hack and Roll 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
    </Layout>
  );
}

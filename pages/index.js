import Head from "next/head";
import CardList from "../components/Spaces/CardList";
import Layout from "../components/Layout/Layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Hack and Roll 2022</title>
        <meta name="description" content="Done for Hack and Roll 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CardList />
    </Layout>
  );
}

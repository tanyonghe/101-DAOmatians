import { Container } from "@chakra-ui/react";
import Head from "next/head";
import CardList from "../components/CardList";

export default function Home() {
  return (
    <Container maxW={"8xl"}>
      <Head>
        <title>Hack and Roll 2022</title>
        <meta name="description" content="Done for Hack and Roll 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        DAO list
        <CardList />
      </main>
    </Container>
  );
}

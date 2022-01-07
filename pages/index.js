import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";
import Card from "../components/Card";
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
        Test
        <CardList />
      </main>
    </Container>
  );
}

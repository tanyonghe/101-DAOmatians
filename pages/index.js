import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { request } from "graphql-request";
import Card from "../components/Card";
import useSWR from "swr";
import { Box, Container } from "@chakra-ui/react";

const URL = "https://hub.snapshot.org/graphql";

const fetcher = (query) => request(URL, query);

const spacesQuery = `
{
  spaces(
    first: 20,
    skip: 0,
    orderBy: "created",
    orderDirection: desc
  ) {
    id
    name
    about
    network
    symbol
    strategies {
      name
      params
    }
    admins
    members
    avatar
    filters {
      minScore
      onlyMembers
    }
    plugins
  }
}
`;

export default function Home() {
  const { isValidating, data, error } = useSWR(spacesQuery, fetcher);

  console.log(data);

  return (
    <Container maxW={"8xl"}>
      <Head>
        <title>Hack and Roll 2022</title>
        <meta name="description" content="Done for Hack and Roll 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        Test
        {!isValidating && !error && (
          <Box
            display={"flex"}
            flexWrap={"wrap"}
            gap={4}
            justifyContent={"center"}
          >
            {data.spaces.map((space) => (
              <Card space={space} key={space.id} />
            ))}
          </Box>
        )}
      </main>
    </Container>
  );
}

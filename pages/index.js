import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import Card from "../components/Card";
import { gql } from "graphql-request";

const spacesQuery = gql`
  {
    spaces(orderBy: "members", orderDirection: desc) {
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

  return (
    <Container maxW={"8xl"}>
      <Head>
        <title>Hack and Roll 2022</title>
        <meta name="description" content="Done for Hack and Roll 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        Test
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          gap={4}
          justifyContent={"center"}
        >
          {!isValidating &&
            !error &&
            data.spaces.map((space) => <Card space={space} key={space.id} />)}
        </Box>
      </main>
    </Container>
  );
}

import { useRouter } from "next/router";
import { request, gql } from "graphql-request";
import { Box, SimpleGrid, ListItem, List, Image } from "@chakra-ui/react";
import { getImage } from "../components/getImage";
import Proposals from "../components/Proposals";
import Votes from "../components/Votes";

const URL = "https://hub.snapshot.org/graphql";
const fetcher = (query) => request(URL, query);
export const getStaticPaths = async () => {
  const spacesQuery = `
  {
    spaces(
      first: 20,
      skip: 0,
      orderBy: "created",
      orderDirection: desc
    ) {
      id
    }
  }
  `;
  const res = await fetcher(spacesQuery);
  const paths = res.spaces.map((x) => {
    return {
      params: { space: x.id },
    };
  });
  return {
    paths,
    fallback: true,
  };
};
export const getStaticProps = async ({ params }) => {
  const spaceQuery = gql`
  {
      space(id: "${params.space}") {
        id
        name
        about
        symbol
        avatar
      }
    }
  `;

  const data = await fetcher(spaceQuery);
  console.log(data, "HELLO WORLD");
  if (!data.space) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      space: data.space,
    },
  };
};

const Space = ({ space }) => {
  const router = useRouter();
  if (router.isFallback) return <h1>Loading...</h1>;
  const { symbol, name, about, avatar } = space;

  const image = getImage(avatar);
  return (
    <SimpleGrid>
      <SimpleGrid height="32vh" padding={10}>
        <Box>
          <Image
            src={image}
            height="100px"
            sx={{ display: "inline" }}
            paddingRight="4"
          />
          <Box fontSize="6xl" sx={{ display: "inline" }}>
            {symbol}
          </Box>
        </Box>
        <Box fontSize="3xl">{name}</Box>
        <Box>{about}</Box>
      </SimpleGrid>
      <Votes id={space.id} />
      <Proposals id={space.id} />
    </SimpleGrid>
  );
};

export default Space;

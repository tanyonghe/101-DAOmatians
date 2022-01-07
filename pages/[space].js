import { useRouter } from "next/router";
import { request, gql } from "graphql-request";
import {
  Box,
  SimpleGrid,
  CircularProgress,
  Image,
  Center,
} from "@chakra-ui/react";
import { getImage } from "../utils/getImage";
import Votes from "../components/Votes";
import Proposals from "../components/Proposal/Proposals";

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
  if (router.isFallback)
    return (
      <Center height="100vh">
        <CircularProgress isIndeterminate />
      </Center>
    );
  const { symbol, name, about, avatar, id } = space;

  const image = getImage(avatar);
  return (
    <SimpleGrid>
      <SimpleGrid
        height="100%"
        marginX={10}
        paddingX={4}
        paddingTop={10}
        paddingBottom={2}
        boxShadow="2xl"
        marginBottom={8}
      >
        <Box>
          <Image
            rounded="lg"
            src={image}
            height="100px"
            marginRight="4"
            sx={{ display: "inline" }}
            alt={name + "-icon"}
          />
          <Box fontSize="6xl" sx={{ display: "inline" }} fontWeight="bold">
            {symbol}
          </Box>
        </Box>
        <Box fontSize="3xl" fontWeight="bold">
          {name}
        </Box>
        <Box>{about}</Box>
      </SimpleGrid>
      <Votes id={id} />
      <Proposals id={id} />
    </SimpleGrid>
  );
};

export default Space;

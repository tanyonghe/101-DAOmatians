import {
  Box,
  Center,
  CircularProgress,
  Flex,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { gql, request } from "graphql-request";
import { useRouter } from "next/router";
import Layout from "../components/Layout/Layout";
import Proposals from "../components/Proposal/Proposals";
import Votes from "../components/Votes";
import { getImage } from "../utils/getImage";

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
    <Layout>
      <SimpleGrid>
        <SimpleGrid
          height="100%"
          marginX={10}
          paddingBottom={2}
          marginBottom={8}
        >
          <Flex>
            <Image
              rounded="full"
              src={image}
              height="100px"
              marginRight="4"
              sx={{ display: "inline" }}
              alt={name + "-icon"}
            />
            <Box fontSize="6xl" sx={{ display: "inline" }} fontWeight="bold">
              {symbol}
            </Box>
          </Flex>
          <Box fontSize="3xl" fontWeight="bold" mt={3}>
            {name}
          </Box>
          <Box>{about}</Box>
        </SimpleGrid>
        <Votes id={id} />
        <Proposals id={id} />
      </SimpleGrid>
    </Layout>
  );
};

export default Space;

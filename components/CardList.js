import { Box, CircularProgress } from "@chakra-ui/react";
import { gql } from "graphql-request";
import useSWR from "swr";
import Card from "./Card";

const spacesQuery = gql`
  {
    spaces(orderBy: "members", orderDirection: desc, where: {id: "uniswap"}) {
      id
      name
      about
      network
      symbol
      admins
      members
      avatar
      filters {
        minScore
        onlyMembers
      }
    }
  }
`;

const CardList = () => {
  const { data, error } = useSWR(spacesQuery, { revalidateOnFocus: false });
  //   actual data queried on snapshot main page
  //   const { data, error } = useSWR("explore", restFetcher);
  if (error) return <div>Error</div>;
  if (!data)
    return (
      <Box display={"flex"} justifyContent={"center"}>
        <CircularProgress isIndeterminate mt={5} />
      </Box>
    );

  return (
    <Box display={"flex"} flexWrap={"wrap"} gap={4} justifyContent={"center"}>
      {data.spaces.map((space) => (
        <Card space={space} key={space.id} />
      ))}
      {/* snapshot data */}
      {/* {Object.keys(data.spaces)
      .slice(0, 10)
      .map((id) => (
        <Card space={data.spaces[id]} id={id} key={id} />
      ))} */}
    </Box>
  );
};

export default CardList;

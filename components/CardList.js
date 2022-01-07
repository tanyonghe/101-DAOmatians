import { Box } from "@chakra-ui/react";
import { gql } from "graphql-request";
import useSWR from "swr";
import Card from "./Card";

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

const CardList = () => {
  const { data, error } = useSWR(spacesQuery, { revalidateOnFocus: false });
  //   actual data queried on snapshot main page
  //   const { data, error } = useSWR("explore", restFetcher);
  if (error) return <div>error</div>;
  if (!data) return <div>loading...</div>;

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

import { Box, Button, CircularProgress } from "@chakra-ui/react";
import { gql } from "graphql-request";
import { useRef } from "react";
import useSWR from "swr";
import Card from "./Card";

const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null;
  if (pageIndex === 0) return spacesQuery(0);

  return spacesQuery(previousPageData.spaces.length + pageIndex); // SWR key
};

const spacesQuery = (skip) => gql`
  {
    spaces(orderBy: "members", orderDirection: desc, first: 12, skip: ${skip}, where: {id: "uniswap"})
    {
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
  //   const { data, error, mutate, setSize } = useSWRInfinite(getKey, {
  //     revalidateOnFocus: false,
  //   });
  const { data, error } = useSWR(spacesQuery(0), {
    revalidateOnFocus: false,
  });
  const listInnerRef = useRef();

  const onScroll = () => {
    if (listInnerRef.current) {
      //   const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      //   console.log(listInnerRef.current.offsetTop);
    }
  };

  console.log(data);
  //   actual data queried on snapshot main page
  //   const { data, error } = useSWR("explore", restFetcher);
  if (error) return <div>Error</div>;
  if (!data) {
    return (
      <Box display={"flex"} justifyContent={"center"}>
        <CircularProgress isIndeterminate mt={5} />
      </Box>
    );
  }

  return (
    <Box
      display={"flex"}
      flexWrap={"wrap"}
      gap={4}
      justifyContent={"center"}
      ref={listInnerRef}
      onWheel={onScroll}
    >
      {data.spaces.map((space) => (
        <Card space={space} key={space.id} />
      ))}
      {/* snapshot data */}
      {/* {Object.keys(data.spaces)
      .slice(0, 10)
      .map((id) => (
        <Card space={data.spaces[id]} id={id} key={id} />
      ))} */}
      <Button mb={10} onClick={() => setSize((prev) => prev + 12)}>
        Load More
      </Button>
    </Box>
  );
};

export default CardList;

import { ArrowDownIcon, ArrowUpIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  CircularProgress,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Select,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import useSWR from "swr";
import networkIdList from "../../constants/networkIdList";
import { restFetcher } from "../../utils/fetcher";
import Card from "./Card";
import SearchBar from "./SearchBar";

const CardList = () => {
  const { data, error } = useSWR("explore", restFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("spaces");
  const [spaceCount, setSpaceCount] = useState(12);
  const [sortByMembers, setSortByMembers] = useState(1);
  const outerListRef = useRef();

  if (error) return <div>Error</div>;
  if (!data) {
    return (
      <Box display={"flex"} justifyContent={"center"}>
        <CircularProgress isIndeterminate mt={5} />
      </Box>
    );
  }

  const filterFunction = (id) => {
    switch (category) {
      case "spaces":
        return data.spaces[id].name
          .toLowerCase()
          .includes(search.toLowerCase());
      case "network":
        return networkIdList[data.spaces[id].network]
          .toLowerCase()
          .includes(search.toLowerCase());
      case "plugins":
        return Object.keys(data.spaces[id].plugins).includes(
          search.toLowerCase()
        );
    }
    return !search;
  };

  const sortFunction = (a, b) =>
    data.spaces[a].followers <= data.spaces[b].followers ||
    !data.spaces[a].followers
      ? sortByMembers
      : -sortByMembers;

  return (
    <Flex flexDirection={"column"} justifyContent={"center"}>
      <SearchBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        setSortByMembers={setSortByMembers}
        sortByMembers={sortByMembers}
      />
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        gap={6}
        overflowY={"auto"}
        justifyContent={"center"}
        ref={outerListRef}
      >
        {Object.keys(data.spaces)
          .filter(filterFunction)
          .sort(sortFunction)
          .slice(0, spaceCount)
          .map((id) => (
            <Card
              space={data.spaces[id]}
              id={id}
              key={id}
              outerListRef={outerListRef}
            />
          ))}
      </Box>
      <Button
        mx={"auto"}
        onClick={() => setSpaceCount((count) => count + 12)}
        w={"fit-content"}
      >
        Load More
      </Button>
    </Flex>
  );
};

export default CardList;

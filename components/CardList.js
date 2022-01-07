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
import networkIdList from "../constants/networkIdList";
import { restFetcher } from "../utils/fetcher";
import Card from "./Card";

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
  const onWheel = (e) => {
    if (outerListRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = outerListRef.current;
      console.log(scrollTop, scrollHeight, clientHeight);
    }
  };

  return (
    <Box>
      <Flex my={8} w={"full"} justifyContent="center">
        <InputGroup w={"30%"}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="search"
            placeholder="Search group"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputRightAddon p={0}>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="spaces">Spaces</option>
              <option value="network">Networks</option>
              {/* <option value="strategies">Strategies</option> */}
              <option value="plugins">Plugins</option>
            </Select>
          </InputRightAddon>
        </InputGroup>
        <Button
          onClick={() => setSortByMembers((prev) => -prev)}
          ml={6}
          rightIcon={sortByMembers === 1 ? <ArrowDownIcon /> : <ArrowUpIcon />}
        >
          Sort by Members
        </Button>
      </Flex>
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        gap={6}
        overflowY={"auto"}
        justifyContent={"center"}
        ref={outerListRef}
        onWheel={onWheel}
      >
        {Object.keys(data.spaces)
          .filter((id) => {
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
          })
          .sort((a, b) =>
            data.spaces[a].followers <= data.spaces[b].followers ||
            !data.spaces[a].followers
              ? sortByMembers
              : -sortByMembers
          )
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
      <Button mb={10} onClick={() => setSpaceCount((count) => count + 12)}>
        Load More
      </Button>
    </Box>
  );
};

export default CardList;

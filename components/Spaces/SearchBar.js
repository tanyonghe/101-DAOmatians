import { ArrowDownIcon, ArrowUpIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Select,
} from "@chakra-ui/react";

const SearchBar = ({
  search,
  setSearch,
  category,
  setCategory,
  setSortByMembers,
  sortByMembers,
}) => {
  return (
    <Flex
      mb={8}
      w={"full"}
      justifyContent="center"
      flexDirection={{ base: "column", md: "row" }}
    >
      <InputGroup w={{ base: "80%", md: "40%" }} mx={{ base: "auto", md: "0" }}>
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
            fontWeight={"600"}
            color={"inherit"}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="spaces">Spaces</option>
            <option value="network">Networks</option>
            {/* <option value="strategies">Strategies</option> */}
            {/* <option value="plugins">Plugins</option> */}
          </Select>
        </InputRightAddon>
      </InputGroup>
      <Button
        onClick={() => setSortByMembers((prev) => -prev)}
        ml={6}
        m={{ base: "16px auto", md: "0 0 0 20px" }}
        rightIcon={sortByMembers === 1 ? <ArrowDownIcon /> : <ArrowUpIcon />}
      >
        Sort by Members
      </Button>
    </Flex>
  );
};

export default SearchBar;

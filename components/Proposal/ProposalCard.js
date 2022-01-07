import {
  ListItem,
  Box,
  Badge,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import ProposalData from "./ProposalData";
import Link from "next/link";

const ProposalCard = ({ proposal }) => {
  const backgroundColour = useColorModeValue("white", "gray.800");
  const getColor = (color) => {
    if (color === "pending") return "purple.800";
    if (color === "active") return "green.700";
    if (color === "closed") return "red.700";
    return "grey.800";
  };
  return (
    <ListItem
      boxShadow="xl"
      display="flex"
      flexDir={["column", "column", "column", "row", "row"]}
      marginTop={8}
      bg={backgroundColour}
      rounded={"lg"}
    >
      <Box
        paddingX={6}
        paddingY={5}
        width={["100%", "100%", "100%", "50%", "60%"]}
      >
        <Box fontSize="2xl" fontWeight="bold" cursor={"pointer"}>
          <Link href={`/${proposal.space.id}/${proposal.id}`}>
            <a>{proposal.title}</a>
          </Link>
        </Box>
        <Box sx={{ display: "inline-block" }}>by: {proposal.author}</Box>
        <Badge
          variant="solid"
          float="right"
          marginRight={4}
          background={getColor(proposal.state)}
        >
          {proposal.state}
        </Badge>
      </Box>
      <SimpleGrid width={["100%", "100%", "100%", "50%", "40%"]}>
        <ProposalData id={proposal.id} />
      </SimpleGrid>
    </ListItem>
  );
};
export default ProposalCard;

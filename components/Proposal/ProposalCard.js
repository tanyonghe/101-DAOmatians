import { ListItem, Box, Badge, SimpleGrid } from "@chakra-ui/react";
import ProposalData from "./ProposalData";
import Link from "next/link";

const ProposalCard = ({ proposal }) => {
  return (
    <ListItem
      boxShadow="2xl"
      display="flex"
      flexDir={["column", "column", "column", "row", "row"]}
      marginTop={8}
    >
      <Box
        paddingX={2}
        paddingY={4}
        width={["100%", "100%", "100%", "50%", "60%"]}
      >
        <Box fontSize="2xl" fontWeight="bold">
          <Link href={`/${proposal.space.id}/${proposal.id}`}>
            <a>{proposal.title}</a>
          </Link>
        </Box>
        <Box sx={{ display: "inline-block" }}>by: {proposal.author}</Box>
        <Badge variant="solid" float="right" marginRight={4}>
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

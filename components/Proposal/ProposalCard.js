import { ListItem, List, Box, Badge, SimpleGrid } from "@chakra-ui/react";
import ProposalData from "./ProposalData";

const ProposalCard = ({ proposal }) => {
  return (
    <ListItem boxShadow="2xl" display="flex">
      <Box key={proposal.id} paddingX={2} paddingY={4} width="60vw">
        <Box fontSize="2xl" fontWeight="bold">
          {proposal.title}
        </Box>
        <Box sx={{ display: "inline-block" }}>by: {proposal.author}</Box>
        <Badge variant="solid" float="right" marginRight={4}>
          {proposal.state}
        </Badge>
      </Box>
      <SimpleGrid width="40vw">
        <ProposalData id={proposal.id} />
      </SimpleGrid>
    </ListItem>
  );
};
export default ProposalCard;

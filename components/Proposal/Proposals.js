import useSWR from "swr";
import { List, Box } from "@chakra-ui/react";
import { gql } from "graphql-request";
import ProposalCard from "./ProposalCard";

const Proposals = ({ id }) => {
  const proposalsQuery = gql`
  {
    proposals(
      first: 20, 
      skip:0, 
      where: {
        space: "${id}"
      }, 
      orderBy: "created", 
      orderDirection: desc
    ) {
      id
      title
      state
      author
      space {
        id
      }
    }
  }
  `;
  const { data, error } = useSWR(proposalsQuery, {
    revalidateOnFocus: false,
  });
  if (error) return <div>error</div>;
  if (!data)
    return (
      <Box padding={6} spacing={3} fontSize="6xl" fontWeight="bold">
        Loading Proposals...
      </Box>
    );
  const proposals = data.proposals;
  return (
    <List padding={6} spacing={3} height="100%">
      {proposals.map((proposal) => {
        return <ProposalCard key={proposal.id} proposal={proposal} />;
      })}
    </List>
  );
};
export default Proposals;

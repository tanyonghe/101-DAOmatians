import useSWR from "swr";
import { ListItem, List, Box, Badge, SimpleGrid } from "@chakra-ui/react";
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
      body
      choices
      start
      end
      snapshot
      state
      author
      space {
        id
        name
      }
    }
  }
  `;
  const { data, error } = useSWR(proposalsQuery, {
    revalidateOnFocus: false,
  });
  if (error) return <div>error</div>;
  if (!data) return <div>loading...</div>;
  const proposals = data.proposals;
  return (
    <List padding="6" spacing={3} height="50vh" sx={{ overflowY: "scroll" }}>
      {proposals.map((proposal) => {
        return <ProposalCard key={proposal.id} proposal={proposal} />;
      })}
    </List>
  );
};
export default Proposals;

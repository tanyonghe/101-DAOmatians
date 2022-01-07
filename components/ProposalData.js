import { gql } from "graphql-request";
import { Box, SimpleGrid } from "@chakra-ui/react";
import useSWR from "swr";
const ProposalData = ({ id }) => {
  const votesQueryFromProposal = gql`
    {
      votes(
        first: 1000000
        skip: 0
        where: { proposal: "${id}" }
        orderBy: "created"
        orderDirection: desc
      ) {
        voter
        vp
        choice
      }
    }
    `;
  const { data, error } = useSWR(votesQueryFromProposal, {
    revalidateOnFocus: false,
  });
  if (error) return <div>error</div>;
  if (!data) return <div>loading...</div>;
  const votes = data.votes;
  const uniqueVotes = [...new Set(votes.map((vote) => vote.voter))].length;
  const totalVP = votes.reduce((acc, vote) => acc + vote.vp, 0);
  const uniqueChoices = [...new Set(votes.map((vote) => vote.choice))].length;
  console.log(votes);
  return (
    <SimpleGrid>
      <Box>Total VP: {totalVP.toFixed(2)}</Box>
      <Box>Unique Votes: {uniqueVotes}</Box>
      <Box>{uniqueChoices}</Box>
    </SimpleGrid>
  );
};
export default ProposalData;

import { gql } from "graphql-request";
import { Box, SimpleGrid, CircularProgress, Tooltip } from "@chakra-ui/react";
import useSWR from "swr";
import ProposalChart from "./ProposalChart";
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
  if (!data) return <CircularProgress isIndeterminate />;
  const votes = data.votes;
  const uniqueVotes = [...new Set(votes.map((vote) => vote.voter))].length;
  const totalVP = votes.reduce((acc, vote) => acc + vote.vp, 0);
  return (
    <SimpleGrid columns={4} fontWeight="bold">
      <ProposalChart votes={votes} />
      <Tooltip label="Total Vote Participation" placement="top-start">
        <Box>
          <Box>Total VP:</Box>
          <Box fontSize="3xl">{totalVP.toFixed(2)}</Box>
        </Box>
      </Tooltip>
      <Box>
        <Box>Unique Votes:</Box>
        <Box fontSize="3xl">{uniqueVotes}</Box>
      </Box>
      <Box>{}</Box>
    </SimpleGrid>
  );
};
export default ProposalData;

import { gql } from "graphql-request";
import { Box, SimpleGrid, CircularProgress, Center } from "@chakra-ui/react";
import useSWR from "swr";
import ProposalChart from "./ProposalChart";
import { initialiseData } from "../../utils/proposal/initialiseData";
import { getCloseness } from "../../utils/proposal/getCloseness";
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
  if (!data)
    return (
      <Center>
        <CircularProgress isIndeterminate />
      </Center>
    );
  const votes = data.votes;
  const uniqueVotes = [...new Set(votes.map((vote) => vote.voter))].length;
  const totalVP = votes.reduce((acc, vote) => acc + vote.vp, 0);
  const uniqueChoices = Math.max(
    ...votes.flatMap((x) => {
      if (typeof x.choice === "object" && x.choice !== null) return 0;
      if (Array.isArray(x.choice)) return x.choice.flatMap((y) => y);
      return x.choice;
    })
  );
  const data2 = initialiseData(uniqueChoices, votes);
  const checkCloseness = getCloseness(data2, totalVP);
  return (
    <SimpleGrid columns={[2, 2, 4, 4, 4]} fontWeight="bold" padding={4}>
      <ProposalChart data={data2} />
      <Box>
        <Box>Closeness:</Box>
        <Box fontSize="3xl">{checkCloseness}</Box>
      </Box>
      <Box>
        <Box>Unique Votes:</Box>
        <Box fontSize="3xl">{uniqueVotes}</Box>
      </Box>
      <Box>
        <Box>Total Vote Participation:</Box>
        <Box fontSize="lg">{totalVP.toFixed(2)}</Box>
      </Box>
    </SimpleGrid>
  );
};
export default ProposalData;

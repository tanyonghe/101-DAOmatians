import useSWR from "swr";
import { Box, SimpleGrid, Tooltip } from "@chakra-ui/react";
import { gql } from "graphql-request";

const Votes = ({ id }) => {
  const votesQuery = gql`
    {
      votes(
        first: 1000000
        skip: 0
        where: { space: "${id}" }
        orderBy: "created"
        orderDirection: desc
      ) {
        voter
        vp
      }
    }
  `;
  const { data, error } = useSWR(votesQuery, { revalidateOnFocus: false });
  if (error) return <div>error</div>;
  if (!data)
    return (
      <SimpleGrid
        height="16vh"
        paddingX={8}
        columns={3}
        boxShadow="2xl"
        fontWeight="bold"
      >
        <SimpleGrid>
          <Box>
            <Box fontSize="large">Number of Unique Voters:</Box>
            <Box fontSize="6xl">Loading...</Box>
          </Box>
        </SimpleGrid>
        <SimpleGrid>
          <Tooltip
            label="The Average Voting Power by an Individual"
            placement="top-start"
          >
            <Box>
              <Box fontSize="large">Average Voting Power:</Box>
              <Box fontSize="6xl">Loading...</Box>
            </Box>
          </Tooltip>
        </SimpleGrid>
        <SimpleGrid>
          <Tooltip
            placement="top-start"
            label="A Measure of how many people are actively participating"
          >
            <Box>
              <Box fontSize="large">
                Voting Power vs Actual Number of People:
              </Box>
              <Box fontSize="6xl">Loading...</Box>
            </Box>
          </Tooltip>
        </SimpleGrid>
      </SimpleGrid>
    );
  const votes = data.votes;
  const uniqueVotes = [...new Set(votes.map((vote) => vote.voter))].length;
  const totalVotes = votes.reduce((acc, x) => acc + x.vp, 0);
  const avgVotes = totalVotes / uniqueVotes;
  const ratio = uniqueVotes / totalVotes;
  return (
    <SimpleGrid
      height="16vh"
      paddingX={8}
      columns={3}
      boxShadow="2xl"
      fontWeight="bold"
    >
      <SimpleGrid>
        <Box>
          <Box fontSize="large">Number of Unique Voters:</Box>
          <Box fontSize="6xl">{uniqueVotes}</Box>
        </Box>
      </SimpleGrid>
      <SimpleGrid>
        <Tooltip
          label="The Average Voting Power by an Individual"
          placement="top-start"
        >
          <Box>
            <Box fontSize="large">Average Voting Power:</Box>
            <Box fontSize="6xl">{avgVotes.toFixed(2)}</Box>
          </Box>
        </Tooltip>
      </SimpleGrid>
      <SimpleGrid>
        <Tooltip
          placement="top-start"
          label="A Measure of how many people are actively participating"
        >
          <Box>
            <Box fontSize="large">Voting Power vs Actual Number of People:</Box>
            <Box fontSize="6xl">1:{ratio.toFixed(2)}</Box>
          </Box>
        </Tooltip>
      </SimpleGrid>
    </SimpleGrid>
  );
};
export default Votes;

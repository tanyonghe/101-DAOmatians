import useSWR from "swr";
import { Box, SimpleGrid, ListItem, List, Image } from "@chakra-ui/react";
import { gql } from "graphql-request";

const Votes = ({ id }) => {
  const votesQuery = gql`
    {
      votes(
        first: 100000
        skip: 0
        where: { space: "${id}" }
        orderBy: "created"
        orderDirection: desc
      ) {
        voter
      }
    }
  `;
  const { data, error } = useSWR(votesQuery);
  if (error) return <div>error</div>;
  if (!data) return <div>loading...</div>;
  const votes = data.votes;
  const uniqueVotes = [...new Set(votes.map((vote) => vote.voter))];
  return (
    <SimpleGrid height="16vh" paddingX={8} columns={3}>
      <SimpleGrid>
        <Box fontSize="large" fontWeight="bold">
          Number of Unique Voters:
        </Box>
        <Box fontSize="6xl">{uniqueVotes.length}</Box>
      </SimpleGrid>
      <SimpleGrid>
        <Box fontSize="large" fontWeight="bold">
          Average Voting Power:{" "}
        </Box>
        <Box fontSize="6xl"></Box>
      </SimpleGrid>
      <SimpleGrid>
        <Box fontSize="large" fontWeight="bold">
          Voting Power vs Actual Number of People:
        </Box>
        <Box fontSize="6xl"></Box>
      </SimpleGrid>
    </SimpleGrid>
  );
};
export default Votes;

import useSWR from "swr";
import { Box, CircularProgress, SimpleGrid, Tooltip } from "@chakra-ui/react";
import { gql } from "graphql-request";

const votesQuery = (id) => gql`
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

const stats = [
  { id: 1, name: "Number of Unique Voters:" },
  {
    id: 2,
    name: "Average Voting Power:",
    label: "The Average Voting Power by an Individual",
  },
  {
    id: 3,
    name: "Voting Power vs Actual Number of People:",
    label: "The Average Voting Power by an Individual",
  },
];

const Votes = ({ id }) => {
  const { data, error } = useSWR(votesQuery(id), { revalidateOnFocus: false });
  if (error) return <div>error</div>;
  if (!data)
    return (
      <SimpleGrid
        height="100%"
        fontWeight="bold"
        marginX={10}
        columns={[1, 1, 1, 3, 3]}
      >
        {stats.map((stat) => (
          <SimpleGrid
            marginTop={8}
            boxShadow="2xl"
            paddingX={4}
            key={stat.id}
            width={["100%", "100%", "100%", "30vw", "30vw"]}
          >
            {stat.label ? (
              <Tooltip label={stat.label} placement="top-start">
                <Box>
                  <Box fontSize="large">{stat.name}</Box>
                  <CircularProgress isIndeterminate />
                </Box>
              </Tooltip>
            ) : (
              <Box>
                <Box fontSize="large">{stat.name}</Box>
                <CircularProgress isIndeterminate />
              </Box>
            )}
          </SimpleGrid>
        ))}
      </SimpleGrid>
    );
  const votes = data.votes;
  const uniqueVotes = [...new Set(votes.map((vote) => vote.voter))].length;
  const totalVotes = votes.reduce((acc, x) => acc + x.vp, 0);
  const avgVotes = totalVotes / uniqueVotes;
  const ratio = uniqueVotes / totalVotes;
  return (
    <SimpleGrid
      height="100%"
      fontWeight="bold"
      marginX={10}
      columns={[1, 1, 1, 3, 3]}
    >
      <SimpleGrid
        marginTop={8}
        boxShadow="2xl"
        paddingX={4}
        width={["100%", "100%", "100%", "30vw", "30vw"]}
      >
        <Box>
          <Box fontSize="large">Number of Unique Voters:</Box>
          <Box fontSize="6xl">{uniqueVotes}</Box>
        </Box>
      </SimpleGrid>
      <SimpleGrid
        marginTop={8}
        boxShadow="2xl"
        paddingX={4}
        width={["100%", "100%", "100%", "30vw", "30vw"]}
      >
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
      <SimpleGrid
        marginTop={8}
        boxShadow="2xl"
        paddingX={4}
        width={["100%", "100%", "100%", "30vw", "30vw"]}
      >
        <Tooltip
          placement="top-start"
          label="A Measure of how many people are actively participating"
        >
          <Box>
            <Box fontSize="large">Voting Power vs Actual Number of People:</Box>
            <Box fontSize="6xl">{ratio.toFixed(2)}</Box>
          </Box>
        </Tooltip>
      </SimpleGrid>
    </SimpleGrid>
  );
};
export default Votes;

import useSWR from "swr";
import {
  Box,
  CircularProgress,
  SimpleGrid,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
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
    name: "% of Average Voting Power:",
    label: "The Average Voting Power compared to the Total Voting Power",
  },
];

const Votes = ({ id }) => {
  const { data, error } = useSWR(votesQuery(id), { revalidateOnFocus: false });
  const backgroundColour = useColorModeValue("white", "gray.800");

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
            boxShadow="xl"
            py={7}
            px={8}
            key={stat.id}
            gap={8}
            rounded={"xl"}
            width={["100%", "100%", "100%", "95%", "95%"]}
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
  const ratio = (avgVotes / totalVotes) * 100;

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
          boxShadow="xl"
          py={6}
          px={8}
          key={stat.id}
          gap={8}
          width={["100%", "100%", "100%", "95%", "95%"]}
          rounded={"lg"}
          bg={backgroundColour}
        >
          {stat.label ? (
            <Tooltip label={stat.label} placement="top-start">
              <Box>
                <Box fontSize="large">{stat.name}</Box>
                <Box fontSize="6xl">
                  {stat.id === 1
                    ? uniqueVotes
                    : stat.id === 2
                    ? avgVotes.toFixed(2)
                    : ratio.toFixed(2)}
                </Box>
              </Box>
            </Tooltip>
          ) : (
            <Box>
              <Box fontSize="large">{stat.name}</Box>
              <Box fontSize="6xl">
                {stat.id === 1
                  ? uniqueVotes
                  : stat.id === 2
                  ? avgVotes.toFixed(2)
                  : ratio.toFixed(2)}
              </Box>
            </Box>
          )}
        </SimpleGrid>
      ))}
    </SimpleGrid>
  );
};
export default Votes;

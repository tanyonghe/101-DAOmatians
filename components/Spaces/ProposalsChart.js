import { Center, CircularProgress, Text } from "@chakra-ui/react";
import { gql } from "graphql-request";
import useSWR from "swr";
import { aggregateProposals } from "../../utils/aggregateProposals";
import CardChart from "./CardChart";

const proposalsQuery = (id) => gql`
  {
    proposals(
      first: 10000
      where: { state: "closed", space: "${id}" }
      orderBy: "created"
      orderDirection: desc
    ) {
      scores
      scores_total
    }
  }
`;

const ProposalsChart = ({ id }) => {
  const { data, error } = useSWR(proposalsQuery(id));

  if (!data) {
    return (
      <Center display={"flex"} placeContent={"center"} pt={6}>
        <CircularProgress isIndeterminate />
      </Center>
    );
  }

  if ((data && !data.proposals.length) || error) {
    return (
      <Center>
        <Text pt={4}>No proposals found!</Text>
      </Center>
    );
  }

  // get last 7 days
  const values = aggregateProposals(data.proposals);
  return (
    <CardChart
      values={values}
      xDataKey={"percentage"}
      yDataKey={"amount"}
      yDomain={["dataMin", "dataMax"]}
      xDomain={["dataMin", "dataMax"]}
    />
  );
};

export default ProposalsChart;

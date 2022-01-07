import { Center, CircularProgress, Text } from "@chakra-ui/react";
import { gql } from "graphql-request";
import useSWR from "swr";
import { aggregateFollowers } from "../../utils/aggregateFollowers";
import CardChart from "./CardChart";

const followsQuery = (id) => gql`
  {
    follows(
        first: 100000
      where: { space: "${id}" }
    ) {
      created
    }
  }
`;

const FollowsChart = ({ id }) => {
  const { data, error } = useSWR(followsQuery(id));

  if (!data) {
    return (
      <Center display={"flex"} placeContent={"center"} pt={6}>
        <CircularProgress isIndeterminate />
      </Center>
    );
  }

  if ((data && !data.follows.length) || error) {
    return (
      <Center>
        <Text pt={4}>No members found!</Text>
      </Center>
    );
  }

  // get last 7 days
  const values = aggregateFollowers(data.follows).slice(-7);
  return (
    <CardChart
      values={values}
      xDataKey={"date"}
      yDataKey={"members"}
      yDomain={["dataMax - 7", "dataMax"]}
      xDomain={["dataMin", "dataMax"]}
    />
  );
};

export default FollowsChart;

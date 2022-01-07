import { Box, Center, CircularProgress, Text } from "@chakra-ui/react";
import { gql } from "graphql-request";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useSWR from "swr";

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

const aggregateProposals = (proposals) => {
  if (!Array.isArray(proposals)) {
    return [];
  }
  const data = {};
  proposals.forEach((proposal) => {
    const winningScore = Math.max(...proposal.scores);
    if (!winningScore) return; // if winningScore is 0, then proposal is invalid
    const percentage =
      Math.round((winningScore / proposal.scores_total) * 1000) / 1000; // 3 d.p.
    if (!data[percentage]) {
      data[percentage] = 0;
    }
    data[percentage]++;
  });
  // convert object of percentage:amount to array of { percentage, amount }
  return Object.keys(data)
    .sort()
    .map((key) => ({
      percentage: key,
      amount: data[key],
    }));
};

const ProposalsChart = ({ id }) => {
  const { data, error } = useSWR(proposalsQuery(id));
  console.log(data);

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
  console.log(values);
  return (
    <ResponsiveContainer
      width="100%"
      height="75%"
      minHeight={"50px"}
      minWidth={"50px"}
    >
      <LineChart
        data={values}
        margin={{ top: 10, right: 0, bottom: 25, left: 0 }}
      >
        <Line type="monotone" dataKey="amount" stroke="black" />
        <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />
        <XAxis dataKey="percentage" domain={["0.5", "1.0"]} />
        <YAxis hide domain={["dataMin", "dataMax"]} />
        <Tooltip allowEscapeViewBox={{ x: true, y: true }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProposalsChart;

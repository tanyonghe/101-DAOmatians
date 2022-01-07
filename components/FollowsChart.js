import { Center, CircularProgress, Text } from "@chakra-ui/react";
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

const aggregateFollowers = (followers) => {
  if (!Array.isArray(followers)) {
    return [];
  }
  const data = {};
  followers.forEach((follower) => {
    const date = new Date(follower.created * 1000).toLocaleDateString();
    if (!data[date]) {
      data[date] = 0;
    }
    data[date]++; // convert to time in ms
  });

  // convert object of date:follows to array of { date, follows }
  const values = Object.keys(data)
    .map((key) => ({ date: key, members: data[key] }))
    .reverse();

  // cumulative summation of follows
  values.reduce((prev, curr) => {
    curr.members += prev.members;
    return curr;
  });
  return values;
};

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
        <Line type="monotone" dataKey="members" stroke="black" />
        <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />
        <XAxis dataKey="date" domain={["dataMax - 7", "dataMax"]} />
        <YAxis hide domain={["dataMin", "dataMax"]} />
        <Tooltip allowEscapeViewBox={{ x: true, y: true }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default FollowsChart;

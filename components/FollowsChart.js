import { Box, Text } from "@chakra-ui/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const aggregateFollowers = (followers) => {
  if (!Array.isArray(followers)) {
    return {};
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
    .map((key) => ({ date: key, value: data[key] }))
    .reverse();

  // cumulative summation of follows
  values.reduce((prev, curr) => {
    curr.value += prev.value;
    return curr;
  });
  return values;
};

const FollowsChart = ({ follows }) => {
  if (!follows.length)
    return (
      <Box>
        <Text>No followers found!</Text>
      </Box>
    );

  // get last 7 days
  const values = aggregateFollowers(follows).slice(-7);

  return (
    <ResponsiveContainer width="100%" height="80%">
      <LineChart
        // width={260}
        // height={200}
        data={values}
        margin={{ top: 20, right: 0, bottom: 0, left: 0 }}
      >
        <Line type="monotone" dataKey="value" stroke="black" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis hide domain={["dataMin", "dataMax"]} />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default FollowsChart;

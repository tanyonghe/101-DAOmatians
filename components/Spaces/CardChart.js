import { useColorModeValue } from "@chakra-ui/react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CardChart = ({ values, yDataKey, xDataKey, xDomain, yDomain }) => {
  const colours = useColorModeValue("var(--chakra-colors-gray-700)", "var(--chakra-colors-gray-300)");
  return (
    <ResponsiveContainer
      width="100%"
      height="70%"
      minHeight={"50px"}
      minWidth={"50px"}
    >
      <LineChart
        data={values}
        margin={{ top: 10, right: 0, bottom: 0, left: 0 }}
      >
        <Line type="monotone" dataKey={yDataKey} stroke={colours} dot={false}/>
        <XAxis dataKey={xDataKey} domain={xDomain} />
        <YAxis hide domain={yDomain} />
        <Tooltip
          allowEscapeViewBox={{ x: true, y: true }}
          itemStyle={{
            color: "black",
          }}
          wrapperStyle={{
            color: "black",
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CardChart;

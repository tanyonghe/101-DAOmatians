import { BarChart, Bar, ResponsiveContainer } from "recharts";
const ProposalChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={160} height={40} data={data}>
        <Bar dataKey="amt" fill="#000" />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default ProposalChart;

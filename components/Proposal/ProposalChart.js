import { BarChart, Bar, ResponsiveContainer } from "recharts";
const ProposalChart = ({ votes }) => {
  const uniqueChoices = [...new Set(votes.map((vote) => vote.choice))].length;
  let data = new Array();
  const initialiseData = () => {
    for (let i = 1; i <= uniqueChoices; ++i) {
      data.push({ amt: 0 });
    }
    votes.forEach((vote) => {
      data[vote.choice - 1].amt += vote.vp;
    });
  };
  initialiseData(data);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={160} height={40} data={data}>
        <Bar dataKey="amt" fill="#000" />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default ProposalChart;

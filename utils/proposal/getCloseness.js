export const getCloseness = (data, totalVP) => {
  if (data.length == 0) return "N/A";
  if (data.length == 1) return "0.00";
  const sortedData = data
    .map((x) => {
      return x.amt;
    })
    .sort((a, b) => b - a);
  return (1 - (sortedData[0] - sortedData[1]) / totalVP).toFixed(2);
};

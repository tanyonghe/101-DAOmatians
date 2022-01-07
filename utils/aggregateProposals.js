export const aggregateProposals = (proposals) => {
  if (!Array.isArray(proposals)) {
    return [];
  }
  const data = {};
  proposals.forEach((proposal) => {
    const winningScore = Math.max(...proposal.scores);
    if (!winningScore)
      return; // if winningScore is 0, then proposal is invalid
    const percentage = Math.round((winningScore / proposal.scores_total) * 1000) / 1000; // 3 d.p.
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

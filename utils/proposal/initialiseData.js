export const initialiseData = (uniqueChoices, votes) => {
  const data = [];
  for (let i = 1; i <= uniqueChoices; ++i) {
    data.push({ amt: 0 });
  }
  if (!uniqueChoices) return data;
  votes.forEach((vote) => {
    if (Array.isArray(vote.choice)) {
      vote.choice.forEach((v) => {
        console.log(v, data[v - 1]);
        return (data[v - 1].amt += vote.vp);
      });
    } else {
      if (typeof vote.choice === "object" && !vote.choice) return;
      data[vote.choice - 1].amt += vote.vp;
    }
  });
  return data;
};

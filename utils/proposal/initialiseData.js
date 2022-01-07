export const initialiseData = (uniqueChoices, votes) => {
  const data = [];
  for (let i = 1; i <= uniqueChoices; ++i) {
    data.push({ amt: 0 });
  }
  votes.forEach((vote) => {
    if (Array.isArray(vote.choice))
      vote.choice.forEach((v) => (data[v - 1].amt += vote.vp));
    else {
      if (typeof vote.choice === "object" && vote.choice !== null) return;
      data[vote.choice - 1].amt += vote.vp;
    }
  });
  return data;
};

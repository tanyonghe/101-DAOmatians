export const aggregateFollowers = (followers) => {
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

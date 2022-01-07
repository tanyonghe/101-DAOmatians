import request from "graphql-request";

const SNAPSHOT_GRAPHQL_URL = "https://hub.snapshot.org/graphql";
const SNAPSHOT_REST_URL = "https://hub.snapshot.org/api/";

export const restFetcher = (input, ...args) =>
  fetch(SNAPSHOT_REST_URL + input, ...args).then((res) => res.json());
const gqlFetcher = (query) => request(SNAPSHOT_GRAPHQL_URL, query);

export default gqlFetcher;

import request from "graphql-request";

const SNAPSHOT_URL = "https://hub.snapshot.org/graphql";

const fetcher = (query) => request(SNAPSHOT_URL, query);

export default fetcher;

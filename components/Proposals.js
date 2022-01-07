import useSWR from "swr";
import { ListItem, List, Box } from "@chakra-ui/react";
import { gql } from "graphql-request";

const Proposals = ({ id }) => {
  const proposalsQuery = gql`
  {
    proposals(
      first: 20, 
      skip:0, 
      where: {
        space: "${id}"
      }, 
      orderBy: "created", 
      orderDirection: desc
    ) {
      id
      title
      body
      choices
      start
      end
      snapshot
      state
      author
      space {
        id
        name
      }
    }
  }
  `;
  const { data, error } = useSWR(proposalsQuery, {
    revalidateOnFocus: false,
  });
  if (error) return <div>error</div>;
  if (!data) return <div>loading...</div>;
  const proposals = data.proposals;
  return (
    <List padding="6" spacing={3} height="50vh" sx={{ overflowY: "scroll" }}>
      {proposals.map((proposal) => {
        return (
          <ListItem key={proposal.id}>
            <Box>{proposal.title}</Box>
            <Box>{proposal.state}</Box>
            <Box>{proposal.author}</Box>
          </ListItem>
        );
      })}
    </List>
  );
};
export default Proposals;

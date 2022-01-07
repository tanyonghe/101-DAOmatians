import useSWR from "swr";
import { useState } from "react";
import { List, Box, Button, CircularProgress, Flex } from "@chakra-ui/react";
import { gql } from "graphql-request";
import ProposalCard from "./ProposalCard";

const Proposals = ({ id }) => {
  const [proposalsSkipped, setProposalsSkipped] = useState(0);

  const proposalsQuery = gql`
  {
    proposals(
      first: 10, 
      skip: ${proposalsSkipped}, 
      where: {
        space: "${id}"
      }, 
      orderBy: "created", 
      orderDirection: desc
    ) {
      id
      title
      state
      author
      space {
        id
      }
    }
  }
  `;
  const { data, error } = useSWR(proposalsQuery, {
    revalidateOnFocus: false,
  });
  if (error) return <div>error</div>;
  if (!data)
    return (
      <Flex padding={6} spacing={3} placeItems={"center"} placeContent={"center"}>
        <CircularProgress isIndeterminate />
      </Flex>
    );
  const proposals = data.proposals;
  const onLeftButtonClick = () => {
    setProposalsSkipped(proposalsSkipped - 10);
  };
  const onRightButtonClick = () => {
    setProposalsSkipped(proposalsSkipped + 10);
  };
  return (
    <>
      <List padding={6} spacing={3} height="100%">
        {proposals.map((proposal) => {
          return <ProposalCard key={proposal.id} proposal={proposal} />;
        })}
      </List>
      <Box display="flex" justifyContent="space-around" marginY={10}>
        <Button
          variant="solid"
          size="lg"
          onClick={onLeftButtonClick}
          isDisabled={proposalsSkipped === 0}
        >
          PREV
        </Button>
        <Button
          variant="solid"
          size="lg"
          onClick={onRightButtonClick}
          isDisabled={proposals.length < 10}
        >
          NEXT
        </Button>
      </Box>
    </>
  );
};
export default Proposals;

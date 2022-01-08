import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Modal,
  useDisclosure,
} from "@chakra-ui/react";
import { gql } from "graphql-request";
import { useEffect, useState } from "react";
import { Graph } from "react-d3-graph";
import useSWR from "swr";
import ExplorerModalContent from "../components/Explorer/ExplorerModal";
import Layout from "../components/Layout/Layout";

const proposalQuery = (id) => gql`
  {
    proposals(first: 10, where: { space: "${id}" }, orderBy: "scores_total", orderDirection: desc) 
    {
      id
      title
      body
      scores
      scores_total
      choices
      votes
    }
  }
`;

const votesQuery = (id) => gql`
  {
    votes(
      first: 10
      where: {
        proposal: "${id}"
      }
      orderBy: "vp"
      orderDirection: desc
    ) {
      id
      created
      choice
      voter
      vp
    }
  }
`;

const votesQueryWithUser = (id) => gql`
  {
    votes(
      first: 10
      where: { voter: "${id}" }
      orderBy: "vp"
      orderDirection: desc
    ) {
      vp
      choice
      proposal {
        id
        title
        body
        scores
        scores_total
        choices
        votes
        space {
          id
        }
      }
    }
  }
`;

// default configs which are used by DAO icons
const myConfig = {
  nodeHighlightBehavior: true,
  width: 1600,
  height: 600,
  node: {
    color: "var(--chakra-colors-red-200)",
    size: 240,
    highlightStrokeColor: "blue",
    fontSize: 16,
    highlightFontSize: 22,
    labelProperty: "displayName",
  },
  link: {
    highlightColor: "lightblue",
  },
};

const Explore = () => {
  // for querying data
  const [spaceIdQuery, setSpaceIdQuery] = useState("");
  const [findSpace, setFindSpace] = useState(false);
  const [proposalIdQuery, setProposalIdQuery] = useState("");
  const [findWhale, setFindWhale] = useState(false);
  const [userIdQuery, setUserIdQuery] = useState("");
  const [findProposals, setFindProposals] = useState(false);
  // nodes and links array for graph
  const [nodes, setNodes] = useState([{ id: "Enter the ID of a DAO above!" }]);
  const [links, setLinks] = useState([]);
  const { data: proposalData, error: proposalError } = useSWR(
    findSpace ? proposalQuery(spaceIdQuery) : null
  );
  const { data: votesData, error: votesError } = useSWR(
    findWhale ? votesQuery(proposalIdQuery) : null
  );
  const { data: userProposalData, error: userProposalError } = useSWR(
    findProposals ? votesQueryWithUser(userIdQuery) : null
  );
  // modal stuff
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState();

  const onClickNode = (nodeId, node) => {
    // open modal
    setModalTitle(node.title);
    setModalBody(node);
    onOpen();
  };

  const loadNodes = (nodeType, node) => {
    if (nodeType === "proposal") {
      setProposalIdQuery(node.id);
      setFindWhale(true);
    }
    if (nodeType === "user") {
      setUserIdQuery(node.title);
      setFindProposals(true);
    }
  };

  const formatProposalData = (proposal) => {
    const winningScore = Math.max(...proposal.scores);
    if (!winningScore) return {}; // if winningScore is 0, then proposal is invalid
    const percentage =
      Math.round((winningScore / proposal.scores_total) * 1000) / 1000;
    return {
      id: proposal.id,
      type: "proposal",
      title: proposal.title,
      body: proposal.body,
      percentage: percentage,
      displayName: proposal.title.substr(0, 5) + "...",
      size: percentage * 200,
      color: "var(--chakra-colors-gray-600)",
    };
  };

  // updating with proposal data from dao
  useEffect(() => {
    if (!proposalError && proposalData && proposalData.proposals.length) {
      setNodes((prev) =>
        prev
          .concat(
            // DAO node added with search
            {
              id: spaceIdQuery,
              displayName: spaceIdQuery,
              type: "DAO",
            },
            // proposals found from DAO
            proposalData.proposals.map(formatProposalData)
          )
          .filter(
            (item) =>
              item.id !== "Enter the ID of a DAO above!" &&
              Object.keys(item).length !== 0
          )
      );
      // link all proposals to DAO
      setLinks((prev) =>
        prev
          .concat(
            proposalData.proposals.map((proposal) => {
              if (!proposal.votes) return {};
              return {
                source: spaceIdQuery,
                target: proposal.id,
              };
            })
          )
          .filter((item) => Object.keys(item).length !== 0)
      );
    }
    setFindSpace(false);
  }, [proposalError, proposalData]);

  // updating user proposals data
  useEffect(() => {
    if (
      !userProposalError &&
      userProposalData &&
      userProposalData.votes.length
    ) {
      setNodes((prev) =>
        prev
          .concat(
            // proposals found from DAO
            userProposalData.votes.map((vote) =>
              formatProposalData(vote.proposal)
            )
          )
          .filter((item) => item && Object.keys(item).length !== 0)
      );
      // link all proposals to DAO
      const tmpEdges = [];
      userProposalData.votes.forEach((vote) => {
        if (!vote.proposal.votes) return;
        // add edge from user to proposals
        tmpEdges.push({
          source: userIdQuery,
          target: vote.proposal.id,
        });

        // if proposal has space id
        if (vote.proposal.space && vote.proposal.space.id) {
          // if space id is not a node yet then add it in
          if (
            !nodes.filter(
              (node) =>
                node.type === "DAO" && node.id === vote.proposal.space.id
            ).length
          ) {
            setNodes((prev) =>
              prev.concat([
                {
                  id: vote.proposal.space.id,
                  displayName: vote.proposal.space.id,
                  type: "DAO",
                },
              ])
            );
          }
          // if edge from space to proposal already exist skip, else add
          if (
            !links.filter(
              (link) =>
                link.source === vote.proposal.space.id &&
                link.target === vote.proposal.id
            ).length
          ) {
            tmpEdges.push({
              source: vote.proposal.space.id,
              target: vote.proposal.id,
            });
          }
        }
      });
      setLinks((prev) =>
        prev
          .concat(tmpEdges)
          .filter((item) => item && Object.keys(item).length !== 0)
      );
    }
    setFindProposals(false);
  }, [userProposalError, userProposalData]);

  // updating votes data
  useEffect(() => {
    if (!votesError && votesData && votesData.votes.length) {
      setNodes((prev) =>
        prev.concat(
          votesData.votes.map((vote) => {
            return {
              id: vote.voter,
              type: "user",
              title: vote.voter,
              vp: vote.vp,
              displayName: vote.voter.substr(0, 5) + "...",
              color: "var(--chakra-colors-green-400)",
            };
          })
        )
      );
      setLinks((prev) =>
        prev.concat(
          votesData.votes.map((vote) => {
            return {
              source: proposalIdQuery,
              target: vote.voter,
            };
          })
        )
      );
    }
    setFindWhale(false);
  }, [votesError, votesData]);

  return (
    <Layout>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ExplorerModalContent
          loadNodes={loadNodes}
          modalBody={modalBody}
          modalTitle={modalTitle}
          onClose={onClose}
        />
      </Modal>
      <InputGroup mb={10}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="search"
          placeholder="Search DAOs with their IDs like ens.eth or gitcoindao.eth"
          value={spaceIdQuery}
          onChange={(e) => setSpaceIdQuery(e.target.value)}
        />
        <InputRightAddon p={0}>
          <Button type="submit" p={4} onClick={() => setFindSpace(true)}>
            Search
          </Button>
        </InputRightAddon>
      </InputGroup>
      <Box overflow={"hidden"}>
        <Graph
          id="graph-id" // id is mandatory
          data={{
            nodes,
            links,
          }}
          config={myConfig}
          onClickNode={onClickNode}
        />
      </Box>
    </Layout>
  );
};

export default Explore;

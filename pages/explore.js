import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
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

// default configs which are used by DAO icons
const myConfig = {
  nodeHighlightBehavior: true,
  width: 1200,
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
  // nodes and links array for graph
  const [nodes, setNodes] = useState([{ id: "Enter the ID of a DAO below!" }]);
  const [links, setLinks] = useState([]);
  const { data: proposalData, error: proposalError } = useSWR(
    findSpace ? proposalQuery(spaceIdQuery) : null,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const { data: votesData, error: votesError } = useSWR(
    findWhale ? votesQuery(proposalIdQuery) : null,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
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

  const loadNodes = (nodeType, nodeId) => {
    if (nodeType === "proposal") {
      setProposalIdQuery(nodeId);
      setFindWhale(true);
    }
  };

  useEffect(() => {
    if (!proposalError && proposalData && proposalData.proposals.length) {
      setNodes((prev) =>
        prev
          .filter((item) => item && item.id !== "Enter the ID of a DAO below!")
          .concat(
            // DAO node added with search
            {
              id: spaceIdQuery,
              displayName: spaceIdQuery,
              type: "DAO",
            },
            // proposals found from DAO
            proposalData.proposals.map((proposal) => {
              const winningScore = Math.max(...proposal.scores);
              if (!winningScore) return; // if winningScore is 0, then proposal is invalid
              const percentage =
                Math.round((winningScore / proposal.scores_total) * 1000) /
                1000;
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
            })
          )
      );
      // link all proposals to DAO
      setLinks((prev) =>
        prev
          .filter((item) => item && item.votes !== 0)
          .concat(
            proposalData.proposals.map((proposal) => ({
              source: spaceIdQuery,
              target: proposal.id,
            }))
          )
      );
    }
    setFindSpace(false);
  }, [proposalError, proposalData]);

  useEffect(() => {
    if (!votesError && votesData && votesData.votes.length) {
      setNodes((prev) =>
        prev.concat(
          votesData.votes.map((vote) => {
            return {
              id: vote.id,
              type: "vote",
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
              target: vote.id,
            };
          })
        )
      );
    }
    setFindWhale(false);
  }, [votesError, votesData]);

  return (
    <Layout>
      <Graph
        id="graph-id" // id is mandatory
        data={{
          nodes,
          links,
        }}
        config={myConfig}
        onClickNode={onClickNode}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ExplorerModalContent
          loadNodes={loadNodes}
          modalBody={modalBody}
          modalTitle={modalTitle}
        />
      </Modal>
      <InputGroup>
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
    </Layout>
  );
};

export default Explore;

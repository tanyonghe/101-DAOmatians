import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";

const ExplorerModalContent = ({
  modalTitle,
  modalBody,
  loadNodes,
  onClose,
}) => {
  if (modalBody.id === "Enter the ID of a DAO above!") {
    return (
      <ModalContent py={4}>
        <ModalHeader fontSize={"xl"} fontWeight={"bold"}>
          {modalTitle}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Try entering the id of a space below, for e.g. ens.eth or
            gitcoindao.eth
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    );
  }
  let modalContent;
  if (modalBody) {
    switch (modalBody.type) {
      case "vote":
        modalContent = (
          <Text>
            <Text fontWeight={"bold"}>Voting Power:</Text> {modalBody.vp}
          </Text>
        );
        break;
      case "proposal":
        modalContent = (
          <>
            <Text>{modalBody.body}</Text>
            <br />
            <Text>Consensus: {(modalBody.percentage * 100).toFixed(1)}%</Text>
          </>
        );
        break;
    }
  }
  return (
    <ModalContent py={4}>
      <ModalHeader fontSize={"xl"} fontWeight={"bold"}>
        {modalTitle}
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text>id:{modalBody && modalBody.id}</Text>
        {modalContent}
        <ModalFooter>
          <Button onClick={() => loadNodes(modalBody.type, modalBody)}>
            Load related
          </Button>
        </ModalFooter>
      </ModalBody>
    </ModalContent>
  );
};

export default ExplorerModalContent;

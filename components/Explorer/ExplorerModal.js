import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";

const ExplorerModalContent = ({ modalTitle, modalBody, loadNodes }) => {
  let modalContent;
  if (modalBody) {
    switch (modalBody.type) {
      case "vote":
        modalContent = <Text>Voting Power: {modalBody.vp}</Text>;
        break;
      case "proposal":
        modalContent = (
          <>
            <Text>{modalBody.body}</Text>
            <br />
            <Text>Consensus: {modalBody.percentage * 100}%</Text>
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
          <Button onClick={() => loadNodes(modalBody.type, modalBody.id)}>
            Load related
          </Button>
        </ModalFooter>
      </ModalBody>
    </ModalContent>
  );
};

export default ExplorerModalContent;

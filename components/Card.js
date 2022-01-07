import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import { gql } from "graphql-request";
import { DEFAULT_AVATAR_URL } from "../constants/homepage";
import { getImage } from "../utils/getImage";
import SpaceCharts from "./SpaceCharts";

const voteQuery = (id) => gql`
  {
    votes(where: { space: "${id}" }) {
      created
      choice
    }
  }
`;

export default function Card({ space, id, outerListRef }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  let imageUrl = getImage(space.avatar);
  useOutsideClick({
    ref: outerListRef,
    handler: onClose,
  });

  const textColour = useColorModeValue("gray.600", "gray.300");

  if (!space.followers) {
    console.log(space);
  }

  return (
    <Center py={12} maxW={"30%"} w={"full"}>
      <Box
        role={"group"}
        p={6}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        w={"full"}
        height={"400px"}
        zIndex={1}
      >
        <Box rounded={"lg"} mt={-12} pos={"relative"} height={"100px"}>
          <Image
            rounded={"lg"}
            mx={"auto"}
            height={"100px"}
            width={"100px"}
            objectFit={"cover"}
            alt={id + " icon"}
            src={imageUrl}
            onError={(e) => {
              e.target.src = DEFAULT_AVATAR_URL;
            }}
          />
        </Box>
        <Stack pt={3} pb={10} align={"center"} h={"full"}>
          <Text
            color={useColorModeValue("gray.500", "gray.400")}
            fontSize={"sm"}
            textTransform={"uppercase"}
          >
            {id}
          </Text>
          <Heading fontSize={"xl"} fontFamily={"body"} textAlign={"center"}>
            {space.name}
          </Heading>
          {isOpen ? (
            <SpaceCharts id={id} />
          ) : (
            <Stack align={"center"} h={"50%"} justifyContent={"space-between"}>
              <Text color={textColour}>{space.about}</Text>
              <Button onClick={onOpen}>See more!</Button>
            </Stack>
          )}
          <Text color={"gray.500"}>Members: {space.followers}</Text>
        </Stack>
      </Box>
    </Center>
  );
}

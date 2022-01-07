import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  CircularProgress,
  Button,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import { gql } from "graphql-request";
import { useRef, useState } from "react";
import useSWR from "swr";
import { DEFAULT_AVATAR_URL } from "../constants/homepage";
import FollowsChart from "./FollowsChart";
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

export default function Card({ space }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const cardRef = useRef();
  let imageUrl = getImage(space.avatar);
  useOutsideClick({
    ref: cardRef,
    handler: onClose,
  });

  return (
    <Center py={12} maxW={"30%"} w={"full"} ref={cardRef}>
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
            alt={space.id + " icon"}
            src={imageUrl}
          />
        </Box>
        <Stack pt={3} align={"center"} h={"full"}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            {space.id}
          </Text>
          <Heading fontSize={"xl"} fontFamily={"body"} textAlign={"center"}>
            {space.name}
          </Heading>
          {isOpen ? (
            <SpaceCharts id={space.id} />
          ) : (
            <Stack align={"center"}>
              <Text color={"gray.600"}>{space.about}</Text>
              <Button onClick={onOpen}>See more!</Button>
            </Stack>
          )}
          {/* <Text color={"gray.500"}>Members: {space.members.length}</Text> */}
        </Stack>
      </Box>
    </Center>
  );
}

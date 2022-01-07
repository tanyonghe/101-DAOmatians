import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  CircularProgress,
} from "@chakra-ui/react";
import { gql } from "graphql-request";
import { useState } from "react";
import useSWR from "swr";
import { DEFAULT_AVATAR_URL } from "../constants/homepage";
import FollowsChart from "./FollowsChart";

const voteQuery = (id) => gql`
  {
    votes(where: { space: "${id}" }) {
      created
      choice
    }
  }
`;

const followsQuery = (id) => gql`
  {
    follows(
        first: 100000
      where: { space: "${id}" }
    ) {
      created
    }
  }
`;

export default function Card({ space }) {
  const [hover, setHover] = useState(false);
  const { data, error } = useSWR(hover ? followsQuery(space.id) : null);

  let imageUrl = space.avatar;
  if (!imageUrl) {
    imageUrl = DEFAULT_AVATAR_URL;
  }
  if (imageUrl.startsWith("ipfs://")) {
    const [_, id] = imageUrl.split("ipfs://");
    imageUrl = "https://cloudflare-ipfs.com/ipfs/" + id;
  }

  return (
    <Center py={12} maxW={"xs"} w={"full"}>
      <Box
        role={"group"}
        p={6}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        w={"full"}
        height={"320px"}
        zIndex={1}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
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
        {hover && !data ? (
          <Box
            display={"flex"}
            placeContent={"center"}
            placeItems={"center"}
            h={"full"}
          >
            <CircularProgress isIndeterminate />
          </Box>
        ) : hover ? (
          <FollowsChart follows={data && data.follows} />
        ) : (
          <Stack pt={10} align={"center"}>
            <Text
              color={"gray.500"}
              fontSize={"sm"}
              textTransform={"uppercase"}
            >
              {space.id}
            </Text>
            <Heading
              fontSize={"xl"}
              fontFamily={"body"}
              fontWeight={500}
              textAlign={"center"}
            >
              {space.name}
            </Heading>
            <Stack direction={"row"} align={"center"}>
              <Text color={"gray.600"}>{space.about}</Text>
            </Stack>
            <Text color={"gray.500"}>Members: {space.members.length}</Text>
          </Stack>
        )}
      </Box>
    </Center>
  );
}

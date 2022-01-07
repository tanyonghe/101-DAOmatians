import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";
import { DEFAULT_AVATAR_URL } from "../constants/homepage";

export default function ProductSimple({ space }) {
  let imageUrl = space.avatar;
  if (!imageUrl) {
    imageUrl = DEFAULT_AVATAR_URL;
  }
  if (imageUrl.startsWith("ipfs://")) {
    const [_, id] = imageUrl.split("ipfs://");
    imageUrl = "https://api.thegraph.com/ipfs/api/v0/cat?arg=" + id;
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
        height={"300px"}
        zIndex={1}
      >
        <Box rounded={"lg"} mt={-12} pos={"relative"} height={"100px"}>
          <Image
            rounded={"lg"}
            mx={"auto"}
            height={"100px"}
            width={"100px"}
            objectFit={"cover"}
            alt={space.symbol + " icon"}
            src={imageUrl}
          />
        </Box>
        <Stack pt={10} align={"center"}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            {space.name}
          </Text>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {space.symbol}
          </Heading>
          <Stack direction={"row"} align={"center"}>
            <Text color={"gray.600"}>{space.about}</Text>
          </Stack>
          <Text>{space.members.length}</Text>
        </Stack>
      </Box>
    </Center>
  );
}

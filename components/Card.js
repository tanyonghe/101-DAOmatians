import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";

const IMAGE =
  "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80";

export default function ProductSimple({ space }) {
  let imageUrl = space.avatar;
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
        </Stack>
      </Box>
    </Center>
  );
}

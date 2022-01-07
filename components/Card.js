import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";
import { getImage } from "./getImage";

export default function Card({ space }) {
  let imageUrl = getImage(space.avatar);
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
        <Stack pt={10} align={"center"}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
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
      </Box>
    </Center>
  );
}

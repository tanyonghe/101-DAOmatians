import {
  Box,
  Center,
  Heading,
  IconButton,
  Image,
  Link as ChakraLink,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import Link from "next/link";
import DEFAULT_AVATAR_URL from "../../constants/constants";
import { getImage } from "../../utils/getImage";
import GraphIcon from "./GraphIcon";
import SpaceCharts from "./SpaceCharts";

export default function Card({ space, id, outerListRef }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  useOutsideClick({
    ref: outerListRef,
    handler: onClose,
  });

  const textColour = useColorModeValue("gray.600", "gray.300");
  const backgroundColour = useColorModeValue("white", "gray.800");

  return (
    <Center py={12} maxW={{ base: "90%", md: "60%", lg: "30%" }} w={"full"}>
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
          <Link href={"/" + id} passHref>
            <Image
              rounded={"full"}
              mx={"auto"}
              height={"100px"}
              width={"100px"}
              objectFit={"cover"}
              alt={id + " icon"}
              shadow={"2xl"}
              cursor={"pointer"}
              transition={"opacity 0.2s ease-in"}
              _hover={{
                opacity: 0.7,
              }}
              src={getImage(space.avatar)}
              onError={(e) => {
                e.target.src = DEFAULT_AVATAR_URL;
              }}
            />
          </Link>
        </Box>
        <Stack pt={3} pb={12} align={"center"} h={"full"}>
          <Text
            color={useColorModeValue("gray.500", "gray.400")}
            fontSize={"sm"}
            textTransform={"uppercase"}
          >
            {id}
          </Text>
          <Link href={"/" + id} passHref>
            <Heading
              as={ChakraLink}
              fontSize={"xl"}
              fontFamily={"body"}
              textAlign={"center"}
            >
              {space.name}
            </Heading>
          </Link>
          {isOpen ? (
            <SpaceCharts id={id} />
          ) : (
            <Stack align={"center"} h={"50%"} justifyContent={"space-between"}>
              <Text color={textColour}>{space.about}</Text>
              <Tooltip label="View trends" placement="top">
                <IconButton
                  onClick={onOpen}
                  icon={<GraphIcon />}
                  bg={backgroundColour}
                  w={12}
                  h={12}
                />
              </Tooltip>
            </Stack>
          )}
          <Text color={useColorModeValue("gray.500", "gray.200")} mt={0}>
            Members: {space.followers}
          </Text>
        </Stack>
      </Box>
    </Center>
  );
}

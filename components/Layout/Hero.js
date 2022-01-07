import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { Blob } from "./Blob";

export default function Hero() {
  return (
    <Container maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "red.400",
                zIndex: -1,
              }}
            >
              DAO Visualization
            </Text>
            <br />
            <Text as={"span"} color={"red.400"} fontWeight={600}>
              Dashboard
            </Text>
          </Heading>
          <Text color={useColorModeValue("gray.700", "gray.100")}>
            Visualize information on the blockchain with our handy tools!
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Link href={"/explore"} passHref>
              <Button
                rounded={"lg"}
                size={"lg"}
                fontWeight={"medium"}
                px={6}
                colorScheme={"red"}
                bg={"red.400"}
                _hover={{ bg: "red.500" }}
              >
                Explore Networks
              </Button>
            </Link>
            <Link href={"/list"} passHref>
              <Button rounded={"lg"} size={"lg"} fontWeight={"medium"} px={6}>
                Explore Trends
              </Button>
            </Link>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Blob
            w={"150%"}
            h={"150%"}
            position={"absolute"}
            top={"-20%"}
            left={0}
            zIndex={-1}
            color={useColorModeValue("red.50", "red.400")}
          />
          <Box
            position={"relative"}
            height={"500px"}
            rounded={"2xl"}
            boxShadow={"2xl"}
            width={"full"}
            overflow={"hidden"}
          >
            <Image
              alt={"Hero Image"}
              layout="fill"
              objectFit="cover"
              src={"/static/images/graph.png"}
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}

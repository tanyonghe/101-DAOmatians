import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container
      as={"header"}
      bg={useColorModeValue("gray.100", "gray.900")}
      maxW={"full"}
      mb={12}
    >
      <Box px={4} maxW={"8xl"} mx={"auto"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex>
            <Link href="/" passHref>
              <Text fontWeight={"600"} fontSize={"lg"} cursor={"pointer"}>
                DAOmations
              </Text>
            </Link>
            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <Link href="/explore">Explorer</Link>
            </Flex>
          </Flex>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              {/* <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"} zIndex={99}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu> */}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
}

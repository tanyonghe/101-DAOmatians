import { Box, Container, useColorModeValue } from "@chakra-ui/react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <Box bg={useColorModeValue("white", "gray.700")}>
      <Header />
      <Container as="main" maxW={"8xl"}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;

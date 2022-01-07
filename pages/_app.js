import { ChakraProvider } from "@chakra-ui/react";
import { SWRConfig } from "swr";
import "../styles/globals.css";
import gqlFetcher from "../utils/fetcher";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: gqlFetcher,
      }}
    >
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </SWRConfig>
  );
}

export default MyApp;

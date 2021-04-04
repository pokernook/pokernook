import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { withUrqlClient, WithUrqlProps } from "next-urql";
import { FC } from "react";

import { theme } from "../theme";
import { getClientConfig } from "../urql";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default withUrqlClient(getClientConfig)(App as FC<WithUrqlProps>);

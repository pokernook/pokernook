import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { withUrqlClient, WithUrqlProps } from "next-urql";
import { FC } from "react";

import { LobbyProvider } from "../context";
import { theme } from "../theme";
import { getClientConfig } from "../urql";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <LobbyProvider server="/api/multiplayer">
        <Component {...pageProps} />
      </LobbyProvider>
    </ChakraProvider>
  );
};

export default withUrqlClient(getClientConfig)(App as FC<WithUrqlProps>);

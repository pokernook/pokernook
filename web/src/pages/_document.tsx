import { ColorModeScript } from "@chakra-ui/react";
import {
  default as NextDocument,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

import { theme } from "../theme";

class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html>
        <Head />
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;

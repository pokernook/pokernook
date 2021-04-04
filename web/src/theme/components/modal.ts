import { ComponentStyleConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const Modal: ComponentStyleConfig = {
  parts: ["header", "body", "footer"],
  baseStyle: (props) => ({
    header: {
      bg: mode("gray.50", "gray.900")(props) as string,
      roundedTop: "md",
    },
    body: { bg: mode("gray.50", "gray.900")(props) as string },
    footer: {
      bg: mode("gray.50", "gray.900")(props) as string,
      roundedBottom: "md",
    },
  }),
};

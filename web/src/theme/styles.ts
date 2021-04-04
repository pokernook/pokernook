import { GlobalStyles, mode } from "@chakra-ui/theme-tools";

export const styles: GlobalStyles = {
  global: (props) => ({
    "*": {
      wordWrap: "normal",
    },
    body: {
      bg: mode("white", "black")(props) as string,
      color: mode("gray.800", "gray.200")(props) as string,
    },
  }),
};

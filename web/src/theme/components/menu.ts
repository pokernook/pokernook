import { ComponentStyleConfig } from "@chakra-ui/theme";
import { mode } from "@chakra-ui/theme-tools";

export const Menu: ComponentStyleConfig = {
  parts: ["item", "list"],
  baseStyle: (props) => ({
    item: {},
    list: { bg: mode("gray.50", "gray.900")(props) as string },
  }),
};

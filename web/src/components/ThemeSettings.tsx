import {
  FormLabel,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { FC } from "react";

export const ThemeSettings: FC = () => {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <>
      <Heading size="md" mb={3}>
        Theme
      </Heading>

      <FormLabel>Choose how PokerNook looks to you.</FormLabel>

      <RadioGroup
        onChange={(e) => setColorMode(e)}
        name="radio-theme"
        defaultValue={colorMode}
      >
        <Stack>
          <Radio value="dark">Dark</Radio>
          <Radio value="light">Light</Radio>
        </Stack>
      </RadioGroup>
    </>
  );
};

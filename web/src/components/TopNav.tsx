import { Flex, Img } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";

import { UserNavMenu } from "./UserNavMenu";

export const TopNav: FC = () => (
  <Flex
    alignItems="center"
    borderBottomWidth={1}
    justifyContent="center"
    minW={0}
    position="relative"
    zIndex={8}
  >
    <Flex flex={1} justifyContent="flex-start" mx={4} />

    <Flex flex={1} justifyContent="center">
      <Link href="/">
        <Img src="/logo.svg" boxSize={12} _hover={{ cursor: "pointer" }} />
      </Link>
    </Flex>

    <Flex flex={1} justifyContent="flex-end" mx={4}>
      <UserNavMenu />
    </Flex>
  </Flex>
);

import { Divider, Flex, Stack, Text } from "@chakra-ui/react";
import { FC } from "react";

import { Avatar } from "../components/Avatar";
import { NavLink } from "../components/NavLink";
import { useAvatarSrc } from "../hooks/use-avatar-src";
import { useUser } from "../hooks/use-user";

export const SideNav: FC = () => {
  const { user } = useUser();
  const avatarSrc = useAvatarSrc(user);

  return (
    <>
      <Flex alignItems="center" mx={3}>
        <Avatar src={avatarSrc} boxSize={20} mr={2} />
        <Text fontWeight={600}>{user?.username}</Text>
        <Text fontWeight={600} color="gray.500">
          {user?.discriminator}
        </Text>
      </Flex>

      <Divider my={3} />

      <Stack as="nav" mx={3}>
        <NavLink href="/">Play</NavLink>
        <NavLink href="/friends">Friends</NavLink>
      </Stack>
    </>
  );
};

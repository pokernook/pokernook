import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Link,
} from "@chakra-ui/react";
import { LobbyAPI } from "boardgame.io";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";

import { DashboardLayout } from "../../components/DashboardLayout";
import { useLobby } from "../../context";

const Game: FC = () => {
  const [activeMatches, setActiveMatches] = useState<LobbyAPI.Match[]>();
  const router = useRouter();
  const lobby = useLobby();

  const { game } = router.query;

  useEffect(() => {
    const fetchActiveMatches = async () => {
      const { matches } = await lobby.listMatches(game as string, {
        isGameover: false,
      });
      setActiveMatches(matches);
    };

    void fetchActiveMatches();
  }, [game, lobby]);

  if (!game) {
    return null;
  }

  return (
    <DashboardLayout>
      <Box w="4xl" pt={10}>
        <Flex justifyContent="space-between">
          <Heading textTransform="capitalize">
            {game?.toString().replaceAll("-", " ")}
          </Heading>

          <Button leftIcon={<Icon as={FiPlus} />} colorScheme="blue">
            Start a new match
          </Button>
        </Flex>

        <Divider mt={2} mb={4} />

        {activeMatches?.length === 0 && (
          <Heading textAlign="center" size="sm">
            No matches found; why not <Link>start one</Link>?
          </Heading>
        )}
      </Box>
    </DashboardLayout>
  );
};

export default Game;

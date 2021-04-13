import { Box, Divider, Heading, Tag, Wrap, WrapItem } from "@chakra-ui/react";
import { LobbyAPI } from "boardgame.io";
import { FC, useEffect, useState } from "react";

import { DashboardLayout } from "../components/DashboardLayout";
import { useLobby } from "../context";

const Play: FC = () => {
  const lobby = useLobby();
  const [games, setGames] = useState<string[]>();

  useEffect(() => {
    const fetchGames = async () => {
      const result = await lobby.listGames();
      setGames(result);
    };

    void fetchGames();
  }, [lobby]);

  return (
    <DashboardLayout>
      <Box w="4xl" pt={10}>
        <Heading>Games</Heading>
        <Divider mt={2} mb={4} />

        <Wrap>
          {games?.map((game, idx) => (
            <WrapItem key={idx}>
              <GameCard game={game} />
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    </DashboardLayout>
  );
};

type GameCardProps = {
  game: string;
};

const GameCard: FC<GameCardProps> = ({ game }: GameCardProps) => {
  const lobby = useLobby();
  const [activeMatches, setActiveMatches] = useState<LobbyAPI.Match[]>();

  useEffect(() => {
    const fetchActiveMatches = async () => {
      const { matches } = await lobby.listMatches(game, { isGameover: false });
      setActiveMatches(matches);
    };

    void fetchActiveMatches();
  }, [game, lobby]);

  return (
    <Box
      w="xs"
      h="24"
      borderWidth={2}
      borderRadius="md"
      p={4}
      _hover={{ cursor: "pointer" }}
    >
      <Heading as="h2" size="md" textTransform="capitalize" mb={3}>
        {game.replaceAll("-", " ")}
      </Heading>

      <Tag variant="subtle" colorScheme="blue">
        {activeMatches?.length === 1
          ? "1 match"
          : `${activeMatches?.length || "0"} matches`}
      </Tag>
    </Box>
  );
};

export default Play;

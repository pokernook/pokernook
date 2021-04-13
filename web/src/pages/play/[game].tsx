import { Box, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";

import { DashboardLayout } from "../../components/DashboardLayout";
import { useLobby } from "../../context";

const Game: FC = () => {
  const router = useRouter();
  const lobby = useLobby();

  const { game } = router.query;

  return (
    <DashboardLayout>
      <Box w="4xl" pt={10}>
        <Heading textTransform="capitalize">
          {game?.toString().replaceAll("-", " ")}
        </Heading>
      </Box>
    </DashboardLayout>
  );
};

export default Game;

import { Server } from "boardgame.io/server";

const PORT = parseInt(process.env.PORT || "8000", 10);

const server = Server({
  games: [],
});

server.run(PORT, () => console.info(`Multiplayer server on ${PORT}`));

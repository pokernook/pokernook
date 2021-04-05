import { Server } from "boardgame.io/server";

const PORT = parseInt(process.env.PORT || "8000", 10);

const server = Server({
  games: [],
});

server
  .run(PORT)
  .then(() => console.info(`Multiplayer server on ${PORT}`))
  .catch((e) => console.error(e));

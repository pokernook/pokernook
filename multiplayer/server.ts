import { PostgresStore } from "bgio-postgres";
import { Server } from "boardgame.io/server";

import { TicTacToe } from "./games";

const DATABASE_URL = process.env.DATABASE_URL || "";
const PORT = parseInt(process.env.PORT || "8000", 10);
const IS_PRODUCTION = process.env.NODE_ENV === "production";

const server = Server({
  db: new PostgresStore(DATABASE_URL, {
    dialectOptions: {
      ssl: IS_PRODUCTION ? { rejectUnauthorized: false } : undefined,
    },
  }),
  games: [TicTacToe],
});

server
  .run(PORT)
  .then(() => console.info(`Multiplayer server on ${PORT}`))
  .catch((e) => console.error(e));

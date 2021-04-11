import { PostgresStore } from "bgio-postgres";
import { Server } from "boardgame.io/server";

import { DemoNumbers } from "./games";

const DATABASE_URL = process.env.DATABASE_URL || "";
const PORT = parseInt(process.env.PORT || "8000", 10);
const IS_PRODUCTION = process.env.NODE_ENV === "production";

const server = Server({
  db: IS_PRODUCTION
    ? new PostgresStore(DATABASE_URL, {
        dialectOptions: {
          ssl: { rejectUnauthorized: false },
        },
      })
    : undefined,
  games: [DemoNumbers],
});

server
  .run(PORT)
  .then(() => console.info(`Multiplayer server on ${PORT}`))
  .catch((e) => console.error(e));

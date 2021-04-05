import { PostgresStore } from "bgio-postgres";
import { Server } from "boardgame.io/server";

const DATABASE_URL = process.env.DATABASE_URL || "";
const PORT = parseInt(process.env.PORT || "8000", 10);

const server = Server({
  db: new PostgresStore(DATABASE_URL, {
    ssl: true,
    native: true,
    dialect: "postgres",
  }),
  games: [],
});

server
  .run(PORT)
  .then(() => console.info(`Multiplayer server on ${PORT}`))
  .catch((e) => console.error(e));

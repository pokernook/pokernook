import { Game } from "boardgame.io";

type GameState = {
  numbers: [number, number];
  string?: string;
};

export const DemoNumbers: Game<GameState> = {
  name: "demo-numbers",

  setup: (ctx) => ({
    numbers: [ctx.random?.D20(), ctx.random?.D20()],
  }),

  moves: {
    addString: (G, _ctx, string: string) => {
      G.string = string;
    },

    deleteString: (G) => {
      delete G.string;
    },

    getNewNumbers: (G, ctx) => {
      if (ctx.random) {
        G.numbers = [ctx.random.D20(), ctx.random.D20()];
      }
    },
  },
};

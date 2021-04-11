import { Game, PlayerID } from "boardgame.io";

type GameState = {
  cells: (PlayerID | null)[];
};

export const TicTacToe: Game<GameState> = {
  name: "tic-tac-toe",
  setup: () => ({ cells: Array(9).fill(null) }),
};

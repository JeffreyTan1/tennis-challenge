import { TiebreakGame } from "../tiebreak-game";
import { PlayerType } from "../types";

describe("TiebreakGame", () => {
  let game: TiebreakGame;
  beforeEach(() => {
    game = new TiebreakGame();
  });

  it("should win when a player wins 7 points and the difference is 2", () => {
    for (let i = 0; i < 7; i++) {
      game.pointWonBy(PlayerType.Player1);
    }
    expect(game.isWonBy(PlayerType.Player1)).toBe(true);
  });

  it("should continue when a player reaches 7 points but the difference is less than 2", () => {
    for (let i = 0; i < 6; i++) {
      game.pointWonBy(PlayerType.Player1);
    }
    for (let i = 0; i < 7; i++) {
      game.pointWonBy(PlayerType.Player2);
    }
    expect(game.isWonBy(PlayerType.Player2)).toBe(false);
  });

  it("should score correctly", () => {
    game.pointWonBy(PlayerType.Player1);
    expect(game.getScore()).toBe("1-0");
  });
});

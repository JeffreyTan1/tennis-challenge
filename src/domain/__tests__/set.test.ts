import { Set, SET_WINNING_SCORE } from "../set";
import { PlayerType } from "../types";

describe("Set", () => {
  let set: Set;
  beforeEach(() => {
    set = new Set();
  });

  it("should be won when a player wins 6 games and the difference is 2", () => {
    for (let i = 0; i < SET_WINNING_SCORE; i++) {
      set.gameWonBy(PlayerType.Player1);
    }
    expect(set.isWon()).toBe(true);
  });

  it("should enter a tiebreak if both players win 6 games", () => {
    for (let i = 0; i < SET_WINNING_SCORE; i++) {
      set.gameWonBy(PlayerType.Player1);
      set.gameWonBy(PlayerType.Player2);
    }
    expect(set.shouldStartTiebreak()).toBe(true);
  });

  it("should score correctly", () => {
    set.gameWonBy(PlayerType.Player1);
    set.gameWonBy(PlayerType.Player2);
    expect(set.getScore()).toBe("1-1");
  });
});

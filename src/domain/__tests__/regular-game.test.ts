import { Player } from "../player";
import { RegularGame } from "../regular-game";
import { PlayerType } from "../types";

const PLAYER_1 = "Player 1";
const PLAYER_2 = "Player 2";

describe("RegularGame", () => {
  let game: RegularGame;
  beforeEach(() => {
    game = new RegularGame(new Player(PLAYER_1), new Player(PLAYER_2));
  });

  it("should win when a player wins 4 points and the difference is 2", () => {
    for (let i = 0; i < 4; i++) {
      game.pointWonBy(PlayerType.Player1);
    }
    expect(game.isWonBy(PlayerType.Player1)).toBe(true);
  });

  it("should continue when a player reaches 4 points but the difference is less than 2", () => {
    for (let i = 0; i < 3; i++) {
      game.pointWonBy(PlayerType.Player1);
    }
    for (let i = 0; i < 4; i++) {
      game.pointWonBy(PlayerType.Player2);
    }
    expect(game.isWonBy(PlayerType.Player2)).toBe(false);
  });

  it("should score deuce when both players have 3 points", () => {
    for (let i = 0; i < 3; i++) {
      game.pointWonBy(PlayerType.Player1);
      game.pointWonBy(PlayerType.Player2);
    }

    expect(game.isWonBy(PlayerType.Player1)).toBe(false);
    expect(game.isWonBy(PlayerType.Player2)).toBe(false);

    expect(game.getScore()).toBe("Deuce");
  });

  it("should score advantage when a player has 4 points and the other has 3", () => {
    // Player 1 wins 3 points
    for (let i = 0; i < 3; i++) {
      game.pointWonBy(PlayerType.Player1);
    }

    // Player 2 wins 3 points
    for (let i = 0; i < 3; i++) {
      game.pointWonBy(PlayerType.Player2);
    }

    // Player 1 wins 1 point
    game.pointWonBy(PlayerType.Player1);

    expect(game.isWonBy(PlayerType.Player1)).toBe(false);
    expect(game.isWonBy(PlayerType.Player2)).toBe(false);

    expect(game.getScore()).toBe("Advantage Player 1");
  });

  it("should score with correct mapping", () => {
    for (let i = 0; i < 3; i++) {
      game.pointWonBy(PlayerType.Player1);
    }
    game.pointWonBy(PlayerType.Player2);
    expect(game.getScore()).toBe("40-15");
  });
});

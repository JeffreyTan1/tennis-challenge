import { Match } from "../match";
import { Player } from "../player";
import { GAME_WINNING_SCORE } from "../regular-game";
import { SET_WINNING_SCORE } from "../set";

const PLAYER_1 = "Player 1";
const PLAYER_2 = "Player 2";

describe("Match", () => {
  let match: Match;
  beforeEach(() => {
    match = new Match(PLAYER_1, PLAYER_2);
  });

  it("should score starting state correctly", () => {
    expect(match.score()).toBe("0-0, 0-0");
  });

  it("should score after player wins a point", () => {
    match.pointWonBy(PLAYER_1);
    expect(match.score()).toBe("0-0, 15-0");
  });

  it("should score after player wins a game", () => {
    for (let i = 0; i < GAME_WINNING_SCORE; i++) {
      match.pointWonBy(PLAYER_1);
    }
    expect(match.score()).toBe("1-0, 0-0");
  });

  it("should show deuce correctly", () => {
    for (let i = 0; i < 3; i++) {
      match.pointWonBy(PLAYER_1);
      match.pointWonBy(PLAYER_2);
    }
    expect(match.score()).toBe("0-0, Deuce");
  });

  it("should show advantage correctly", () => {
    for (let i = 0; i < 3; i++) {
      match.pointWonBy(PLAYER_1);
      match.pointWonBy(PLAYER_2);
    }
    match.pointWonBy(PLAYER_1);
    expect(match.score()).toBe("0-0, Advantage Player 1");
  });

  it("should show tiebreak correctly", () => {
    for (let i = 0; i < SET_WINNING_SCORE; i++) {
      for (let j = 0; j < GAME_WINNING_SCORE; j++) {
        match.pointWonBy(PLAYER_1);
        match.pointWonBy(PLAYER_2);
      }
    }

    match.pointWonBy(PLAYER_1);
    expect(match.score()).toBe("1-1, 1-0");
  });

  it("should reset the games after a set is won", () => {
    for (let i = 0; i < SET_WINNING_SCORE; i++) {
      for (let j = 0; j < GAME_WINNING_SCORE; j++) {
        match.pointWonBy(PLAYER_1);
        match.pointWonBy(PLAYER_2);
      }
    }
    expect(match.score()).toBe("0-0, 0-0");
  });
});

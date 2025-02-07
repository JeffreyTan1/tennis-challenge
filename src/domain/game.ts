import { PlayerType } from "./types";

const GAME_WINNING_SCORE = 4;
const GAME_WINNING_DIFFERENCE = 2;

const SCORE_MAP: { [key: number]: string } = {
  0: "0",
  1: "15",
  2: "30",
  3: "40",
};

export class Game {
  private player1Score: number;
  private player2Score: number;

  constructor() {
    this.player1Score = 0;
    this.player2Score = 0;
  }

  pointWonBy(player: PlayerType) {
    if (player === PlayerType.Player1) {
      this.player1Score++;
    } else {
      this.player2Score++;
    }
  }

  isWonBy(player: PlayerType): boolean {
    if (player === PlayerType.Player1) {
      return (
        this.player1Score >= GAME_WINNING_SCORE &&
        this.player1Score - this.player2Score >= GAME_WINNING_DIFFERENCE
      );
    } else {
      return (
        this.player2Score >= GAME_WINNING_SCORE &&
        this.player2Score - this.player1Score >= GAME_WINNING_DIFFERENCE
      );
    }
  }

  score(): string | undefined {
    if (this.isDeuce()) {
      return "Deuce";
    } else if (this.isAdvantage()) {
      return "Advantage";
    } else {
      return `${SCORE_MAP[this.player1Score]}-${SCORE_MAP[this.player2Score]}`;
    }
  }

  private isDeuce(): boolean {
    return (
      this.player1Score >= 3 &&
      this.player2Score >= 3 &&
      this.player1Score === this.player2Score
    );
  }

  private isAdvantage(): boolean {
    return (
      this.player1Score >= 3 &&
      this.player2Score >= 3 &&
      this.player1Score !== this.player2Score
    );
  }
}

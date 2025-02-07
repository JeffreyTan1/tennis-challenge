import { PlayerType } from "./types";

const SET_WINNING_SCORE = 6;
const SET_WINNING_DIFFERENCE = 2;

export class Set {
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

  getScore(): string {
    return `${this.player1Score} - ${this.player2Score}`;
  }

  isWonBy(player: PlayerType): boolean {
    if (player === PlayerType.Player1) {
      return (
        this.player1Score >= SET_WINNING_SCORE &&
        this.player1Score - this.player2Score >= SET_WINNING_DIFFERENCE
      );
    } else {
      return (
        this.player2Score >= SET_WINNING_SCORE &&
        this.player2Score - this.player1Score >= SET_WINNING_DIFFERENCE
      );
    }
  }
}

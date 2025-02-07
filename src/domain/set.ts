import { PlayerType } from "./types";

const SET_WINNING_SCORE = 6;
const SET_WINNING_DIFFERENCE = 2;

export class Set {
  private player1GamesWon: number;
  private player2GamesWon: number;

  constructor() {
    this.player1GamesWon = 0;
    this.player2GamesWon = 0;
  }

  gameWonBy(player: PlayerType) {
    if (player === PlayerType.Player1) {
      this.player1GamesWon++;
    } else {
      this.player2GamesWon++;
    }
  }

  isWon(): boolean {
    return (
      (this.player1GamesWon >= SET_WINNING_SCORE &&
        this.player1GamesWon - this.player2GamesWon >=
          SET_WINNING_DIFFERENCE) ||
      (this.player2GamesWon >= SET_WINNING_SCORE &&
        this.player2GamesWon - this.player1GamesWon >= SET_WINNING_DIFFERENCE)
    );
  }

  getScore(): string {
    return `${this.player1GamesWon} - ${this.player2GamesWon}`;
  }

  shouldStartTiebreak(): boolean {
    return this.player1GamesWon === 6 && this.player2GamesWon === 6;
  }
}

import { PlayerType } from "./types";

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

  isCompleted(): boolean {
    return this.player1GamesWon === 6 || this.player2GamesWon === 6;
  }

  getScore(): string {
    return `${this.player1GamesWon} - ${this.player2GamesWon}`;
  }

  shouldStartTiebreak(): boolean {
    return this.player1GamesWon === 6 && this.player2GamesWon === 6;
  }
}

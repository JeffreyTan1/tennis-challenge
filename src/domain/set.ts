export class Set {
  private player1GamesWon: number;
  private player2GamesWon: number;

  constructor() {
    this.player1GamesWon = 0;
    this.player2GamesWon = 0;
  }

  getScore(): string {
    return `${this.player1GamesWon} - ${this.player2GamesWon}`;
  }
}

import { Player } from "./player";
import { PlayerType } from "./types";

const GAME_WINNING_SCORE = 4;
const GAME_WINNING_DIFFERENCE = 2;
const MIN_POINTS_TO_DEUCE = 3;

const SCORE_MAP: { [key: number]: string } = {
  0: "0",
  1: "15",
  2: "30",
  3: "40",
};

export class Game {
  private player1: Player;
  private player2: Player;
  private player1Score: number;
  private player2Score: number;

  constructor(player1: Player, player2: Player) {
    this.player1 = player1;
    this.player2 = player2;
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

  getScore(): string {
    if (this.isDeuce()) {
      return "Deuce";
    } else if (this.isAdvantage()) {
      const advantagePlayer =
        this.player1Score > this.player2Score
          ? this.player1.getName()
          : this.player2.getName();
      return `Advantage ${advantagePlayer}`;
    } else {
      return `${SCORE_MAP[this.player1Score]}-${SCORE_MAP[this.player2Score]}`;
    }
  }

  private isDeuce(): boolean {
    return (
      this.player1Score >= MIN_POINTS_TO_DEUCE &&
      this.player2Score >= MIN_POINTS_TO_DEUCE &&
      this.player1Score === this.player2Score
    );
  }

  private isAdvantage(): boolean {
    return (
      this.player1Score >= MIN_POINTS_TO_DEUCE &&
      this.player2Score >= MIN_POINTS_TO_DEUCE &&
      this.player1Score !== this.player2Score
    );
  }
}

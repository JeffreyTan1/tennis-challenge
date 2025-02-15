import { IScoringStrategy } from "./interfaces/i-scoring-strategy";
import { PlayerType } from "./types";

const TIEBREAK_WINNING_SCORE = 7;
const TIEBREAK_WINNING_DIFFERENCE = 2;

export class TiebreakGame implements IScoringStrategy {
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
        this.player1Score >= TIEBREAK_WINNING_SCORE &&
        this.player1Score - this.player2Score >= TIEBREAK_WINNING_DIFFERENCE
      );
    } else {
      return (
        this.player2Score >= TIEBREAK_WINNING_SCORE &&
        this.player2Score - this.player1Score >= TIEBREAK_WINNING_DIFFERENCE
      );
    }
  }

  getScore(): string | undefined {
    if (this.noScores()) {
      return undefined;
    }

    return `${this.player1Score}-${this.player2Score}`;
  }

  private noScores(): boolean {
    return this.player1Score === 0 && this.player2Score === 0;
  }
}

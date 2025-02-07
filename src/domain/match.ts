import { Player } from "./player";
import { RegularGame } from "./regular-game";
import { Set } from "./set";
import { PlayerType } from "./types";
import { IScoringStrategy } from "./interfaces/i-scoring-strategy";
import { TiebreakGame } from "./tiebreak-game";

export class Match {
  private player1: Player;
  private player2: Player;

  private currentSet: Set;
  private currentGame: IScoringStrategy;

  constructor(player1Name: string, player2Name: string) {
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);

    this.currentSet = new Set();
    this.currentGame = new RegularGame(this.player1, this.player2);
  }

  pointWonBy(playerName: string) {
    const playerType = this.getPlayerType(playerName);
    this.currentGame.pointWonBy(playerType);

    if (this.currentGame.isWonBy(playerType)) {
      this.currentSet.gameWonBy(playerType);
      this.resetForNextGame();
    }

    if (this.currentSet.shouldStartTiebreak()) {
      this.currentGame = new TiebreakGame();
    }

    if (this.currentSet.isCompleted()) {
      // START AGAIN
      this.currentSet = new Set();
    }
  }

  score() {
    const setScore = this.currentSet.getScore();
    const gameScore = this.currentGame.getScore();
    return this.combineScoreStrings(setScore, gameScore);
  }

  private getPlayerType(playerName: string): PlayerType {
    if (this.player1.getName() === playerName) {
      return PlayerType.Player1;
    }
    if (this.player2.getName() === playerName) {
      return PlayerType.Player2;
    }
    throw new Error(`Player ${playerName} not found`);
  }

  private combineScoreStrings(
    setScore: string,
    gameOrTiebreakScore: string
  ): string {
    return `${setScore}, ${gameOrTiebreakScore}`;
  }

  private resetForNextGame() {
    this.currentGame = new RegularGame(this.player1, this.player2);
  }
}

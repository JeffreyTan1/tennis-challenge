import { Player } from "./player";
import { Game } from "./game";
import { Set } from "./set";
import { Tiebreak } from "./tiebreak";
import { PlayerType } from "./types";
import { IWinnable } from "./i-winnable";

enum PointAllocation {
  Game,
  Tiebreak,
}

export class Match {
  private player1: Player;
  private player2: Player;

  private currentSet: Set;
  private currentTiebreak: Tiebreak;
  private currentGame: Game;

  private pointAllocationState: PointAllocation;

  constructor(player1Name: string, player2Name: string) {
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);

    this.currentSet = new Set();
    this.currentTiebreak = new Tiebreak();
    this.currentGame = new Game(this.player1, this.player2);

    this.pointAllocationState = PointAllocation.Game;
  }

  pointWonBy(playerName: string) {
    const playerType = this.getPlayerType(playerName);
    this.allocatePoint(playerType);
  }

  score() {
    const setScore = this.currentSet.getScore();
    const gameOrTiebreakScore =
      this.pointAllocationState === PointAllocation.Game
        ? this.currentGame.getScore()
        : this.currentTiebreak.getScore();
    return this.combineScoreStrings(setScore, gameOrTiebreakScore);
  }

  private allocatePoint(playerType: PlayerType) {
    const currentGame: IWinnable =
      this.pointAllocationState === PointAllocation.Game
        ? this.currentGame
        : this.currentTiebreak;

    currentGame.pointWonBy(playerType);

    if (currentGame.isWonBy(playerType)) {
      this.currentSet.gameWonBy(playerType);
      this.resetForNewGame();
    }
  }

  private getPlayerType(playerName: string): PlayerType {
    if (this.player1.getName() === playerName) {
      return PlayerType.Player1;
    }
    if (this.player2.getName() === playerName) {
      return PlayerType.Player2;
    }
    throw new Error("Player not found");
  }

  private resetForNewGame() {
    this.currentGame.reset();
    this.currentTiebreak.reset();
  }

  private combineScoreStrings(
    setScore: string,
    gameOrTiebreakScore: string
  ): string {
    return `${setScore}, ${gameOrTiebreakScore}`;
  }
}

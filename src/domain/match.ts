import { Player } from "./player";
import { Game } from "./game";
import { Set } from "./set";
import { Tiebreak } from "./tiebreak";
import { PlayerType } from "./types";

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
    this.currentGame = new Game();

    this.pointAllocationState = PointAllocation.Game;
  }

  pointWonBy(playerName: string) {
    const playerType =
      this.player1.getName() === playerName
        ? PlayerType.Player1
        : this.player2.getName() === playerName
        ? PlayerType.Player2
        : null;

    if (playerType === null) {
      throw new Error("Player not found");
    }

    if (this.pointAllocationState === PointAllocation.Game) {
      this.currentGame.pointWonBy(playerType);
    } else {
      this.currentTiebreak.pointWonBy(playerType);
    }
  }

  score() {
    // TODO: Combine set and (game/tiebreak) scores
  }
}

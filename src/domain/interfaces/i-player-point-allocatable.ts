import { PlayerType } from "../types";

export interface IPointAllocatable {
  pointWonBy(playerType: PlayerType): void;
  isWonBy(playerType: PlayerType): boolean;
}

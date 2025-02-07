import { PlayerType } from "./types";

export interface IWinnable {
  pointWonBy(playerType: PlayerType): void;
  isWonBy(playerType: PlayerType): boolean;
}

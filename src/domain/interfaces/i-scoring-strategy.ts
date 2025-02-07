import { PlayerType } from "../types";

export interface IScoringStrategy {
  pointWonBy(playerType: PlayerType): void;
  isWonBy(playerType: PlayerType): boolean;
  getScore(): string;
}

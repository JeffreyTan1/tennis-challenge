import { Match } from "./domain/match";

const PLAYER_1 = "Player 1";
const PLAYER_2 = "Player 2";

const match = new Match(PLAYER_1, PLAYER_2);
match.pointWonBy(PLAYER_1);
match.pointWonBy(PLAYER_2);
console.log(match.score());

match.pointWonBy(PLAYER_1);
match.pointWonBy(PLAYER_1);
console.log(match.score());

match.pointWonBy(PLAYER_2);
match.pointWonBy(PLAYER_2);
console.log(match.score());

match.pointWonBy(PLAYER_1);
console.log(match.score());

match.pointWonBy(PLAYER_1);
console.log(match.score());

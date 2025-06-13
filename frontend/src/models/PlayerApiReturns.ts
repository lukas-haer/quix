import { Datex } from "datex-core-legacy/datex.ts";
import { StateOptions } from "./GameState.ts";

export type GetCurrentQuestionReturn = {
	questionText: string; 
	answers: string[]; 
	currentDeadline: Date;
}

export type JoinGameReturn = {
  state: Datex.Pointer<StateOptions>;
  currentRound: Datex.Pointer<number>;
}
import { Datex } from "datex-core-legacy/datex.ts";
import { Question, QuestionType } from "common/models/Question.ts";

export type StateOptions = "setup" | "waiting" | "question" | "solution" | "finished" | "aborted";

export type Player = {name: string; endpointId: Datex.Endpoint; points: number;}

//TODO: This is unused. Get this structure to work.
export type GameState = {
	state: Ref<StateOptions>;
	currentRound: Ref<number>;
	currentDeadline: Date;
	questions: Question<QuestionType>[];
	players: Player[];
}

//This structure is used instead, in combination with separate pointers for state and currentRound.
export type GameStateObjects = {
  currentDeadline: Date;
  questions: Question<QuestionType>[];
  players: Player[];
}
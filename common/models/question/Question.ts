import { type SingleChoiceQuestion } from './types/SingleChoiseQuestion.ts';

export type Question = {
	id: string;
	type: string;
	questionContent: SingleChoiceQuestion
}
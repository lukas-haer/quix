import { type SingleChoiceQuestion } from './types/SingleChoiseQuestion.ts';

export type Question<T> = {
	id: string;
	type: string;
	questionContent: T
}
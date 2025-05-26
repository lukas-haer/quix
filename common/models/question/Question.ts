import { type SingleChoiceQuestion } from './types/SingleChoiseQuestion.ts';

export type Question<T> = {
	id: string;
	position: number;
	type: string;
	questionContent: T
}
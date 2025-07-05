import { Question } from "common/models/Question.ts";

export class QuizOld {
	readonly id: string;
	title: string;
	description: string;
	madeBy: Object;
	questions: Question<any>[];

	constructor(title:string, description: string, questions: Question<any>[]) {
		this.id = crypto.randomUUID()
		this.title = title;
		this.description = description;
		this.madeBy = {};
		this.questions = questions ?? [];
	}
}
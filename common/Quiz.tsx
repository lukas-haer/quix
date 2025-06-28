import { inferType } from "datex-core-legacy/datex_all.ts";
import { SingleChoiceQuestion, MultipleChoiceQuestion } from "common/Question.ts";

export const Quiz = struct("Quiz",
	class {
		@property quizId!: string
		@property title!: string
		@property description!: string
		@property accountId!: string
		@property questions!: (SingleChoiceQuestion | MultipleChoiceQuestion) []
	}
)

export type Quiz = inferType <typeof Quiz>;
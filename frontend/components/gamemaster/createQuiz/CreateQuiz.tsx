import { Component, template } from "uix/components/Component.ts";
import { CreateSingleChoiseQuestion } from "./types/CreateSingleChoiseQuestion.tsx"
const questionSet = $([
	{
		type: "single-choice",
		questionContent: {
			questionText: "What is the best Frontend Framework?",
			answers: {
				a: "React",
				b: "Vue",
				c: "Angular",
				d: "UIX"
			},
			correctAnswer: "d"
		}
	},
		{
		type: "single-choice",
		questionContent: {
			questionText: "What is the best Frontend Framework?",
			answers: {
				a: "Reverse Hashing",
				b: "Reactivity",
				c: "Responsive Design",
				d: "Cross-Realm Functions"
			},
			correctAnswer: "a"
		}
	},
])

@template((type) => <section> 

	<div class={"row small-shadow thin-border p-4"}>
		<div class={"col-12"}>
			<h2>Create a Quiz</h2>
			{questionSet.map((question) => {
				if (question.type === "single-choice") {
					return (
						<CreateSingleChoiseQuestion question={ question.questionContent }/>
					);
				}
				return null;
			})}
		</div>
	</div>

</section>
)

export class CreateQuiz extends Component {}
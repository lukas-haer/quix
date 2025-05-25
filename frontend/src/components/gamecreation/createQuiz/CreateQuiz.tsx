import { Component, template } from "uix/components/Component.ts";
import { CreateSingleChoiseQuestion } from "./types/CreateSingleChoiseQuestion.tsx"
import { type Question } from "common/models/question/Question.ts"


const quiz = $({
	id: crypto.randomUUID(),
	title: "My first Quix",
	madeby: {
		accountId: "account-1",
		name: "John Doe",
	},
    questions: [
        {
			id: crypto.randomUUID(),
            type: "single-choice",
            questionContent: {
                questionText: "What is the best Frontend Framework?",
                answers: {
                    a: "React",
                    b: "Vue",
                    c: "Angular",
                    d: "UIX",
                },
                correctAnswer: "d",
            },
        },
        {
			id: crypto.randomUUID(),
            type: "single-choice",
            questionContent: {
                questionText: "What is the best Frontend Framework?",
                answers: {
                    a: "Reverse Hashing",
                    b: "Reactivity",
                    c: "Responsive Design",
                    d: "Cross-Realm Functions",
                },
                correctAnswer: "a",
            },
        },
    ],
});

function addQuestion(type:string) {
	if (type === 'single-choise') {
		quiz.questions.push({
			id: crypto.randomUUID(),
			type: "single-choice",
			questionContent: {
				questionText: "",
				answers: {
					a: "",
					b: "",
					c: "",
					d: "",
				},
				correctAnswer: "a",
			},
		});
	}
}

export function removeQuestionById(questionId: string) {
  console.log("remove " + questionId + " type: "+ typeof questionId);
  console.log("og: "+ quiz.questions[0].id +" type: "+ typeof quiz.questions[0].id);
  
  
  quiz.questions = [...quiz.questions.filter(
    (question: Question) => question.id !== questionId
  )];

  console.log("Questions after removal:", quiz.questions);
}

function exportQuestionSet() {
    const jsonStr = JSON.stringify(quiz, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz-${quiz.id}.json`;
    a.click();

    URL.revokeObjectURL(url);
}


@template((type) => <section> 

	<div class={"row small-shadow thin-border p-4"}>
		<div class={"col-12"}>
			<h2>Create a Quiz</h2>
			{quiz.questions.map((question) => {
				if (question.type === "single-choice") {
					return (
						<CreateSingleChoiseQuestion question={ question.questionContent } id= {question.id} />
					);
				}
				return null;
			})}
		</div>

		<button type="button" onclick={() => addQuestion('single-choise')}> Add Singlechoise Question </button>
		

	</div>


	<button type="button" onclick={ exportQuestionSet }>Export</button>

</section>
)


export class CreateQuiz extends Component {}
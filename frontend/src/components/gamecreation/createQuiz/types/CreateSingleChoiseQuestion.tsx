import { Component, template, style } from "uix/components/Component.ts";
import { SingleChoiceQuestion } from "common/models/question/types/SingleChoiseQuestion.ts";
import { removeQuestionById } from "frontend/src/components/gamecreation/createQuiz/CreateQuiz.tsx"
import { Question } from "common/models/question/Question.ts";

@template((props) =>  {
	
	const question = props.question as Question<SingleChoiceQuestion>;
	const questioncontent = question.questionContent as SingleChoiceQuestion;
	const answers = questioncontent.answers;

	return (
        <div class="game-creation-container">
            <h3>Frage {props.question.id}</h3>
            <label for={`questionText-${question.id}`}>Frage:</label>
            <textarea
                id={`questionText-${question.id}`}
                placeholder={"Question"}
            >
                {" "}
                {questioncontent.questionText}
            </textarea>
            <div class="gc-row">
                <div class="gc-col gc-col-6">
                    <input type="text" value={answers.a} />
                </div>
                <div class="gc-col gc-col-6">
                    <input type="text" value={answers.b} />
                </div>
                <div class="gc-col gc-col-6">
                    <input type="text" value={answers.c} />
                </div>
                <div class="gc-col gc-col-6">
                    <input type="text" value={answers.d} />
                </div>
            </div>
            <div>
                <strong>Richtige Antwort:</strong>
                <button
                    type="button"
                    class={
                        questioncontent.correctAnswer == "a"
                            ? "correctAnswerButton selected"
                            : "correctAnswerButton"
                    }
                    onclick={() => (questioncontent.correctAnswer = "a")}
                >
                    A
                </button>
                <button
                    type="button"
                    class={
                        questioncontent.correctAnswer == "b"
                            ? "correctAnswerButton selected"
                            : "correctAnswerButton"
                    }
                    onclick={() => (questioncontent.correctAnswer = "b")}
                >
                    B
                </button>
                <button
                    type="button"
                    class={
                        questioncontent.correctAnswer == "c"
                            ? "correctAnswerButton selected"
                            : "correctAnswerButton"
                    }
                    onclick={() => (questioncontent.correctAnswer = "c")}
                >
                    C
                </button>
                <button
                    type="button"
                    class={
                        questioncontent.correctAnswer == "d"
                            ? "correctAnswerButton selected"
                            : "correctAnswerButton"
                    }
                    onclick={() => (questioncontent.correctAnswer = "d")}
                >
                    D
                </button>
            </div>
            <button
                type="button"
                onclick={() => removeQuestionById(props.id.toString())}
            >
                Delete Question
            </button>
        </div>
    );})
@style(css`
	.selected {
		background-color:rgb(35, 13, 129);
	}
	
`)

export class CreateSingleChoiseQuestion extends Component<{ question: Question<SingleChoiceQuestion>, id:string }> {}
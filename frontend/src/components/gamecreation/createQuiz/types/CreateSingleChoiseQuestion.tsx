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
                <div class="gc-col gc-col-6 inline">
					<div class="input-group-container">
						<p class="input-group-text bgcolor-A">A: </p>
                		<input class="input-field" type="text" value={answers.a} />
					</div>
                </div>
                <div class="gc-col gc-col-6">
					<div class="input-group-container">
						<p class="input-group-text bgcolor-B" >B: </p>
                		<input class="input-field" type="text" value={answers.b} />
					</div>                </div>
                <div class="gc-col gc-col-6">
					<div class="input-group-container">
						<p class="input-group-text bgcolor-C">C: </p>
                		<input class="input-field" type="text" value={answers.c} />
					</div>                </div>
                <div class="gc-col gc-col-6">
					<div class="input-group-container">
						<p class="input-group-text bgcolor-D">D: </p>
                		<input class="input-field" type="text" value={answers.d} />
					</div>                </div>
            </div>
            <div class="select-correct-answer">
                <strong style={"margin-right: 10px"}>Richtige Antwort:</strong>
                <button
                    type="button"
                    class={
                        questioncontent.correctAnswer == "a"
                            ? "correctAnswerButton bgcolor-A selected"
                            : "correctAnswerButton bgcolor-A"
                    }
                    onclick={() => (questioncontent.correctAnswer = "a")}
                >
                    A
                </button>
                <button
                    type="button"
                    class={
                        questioncontent.correctAnswer == "b"
                            ? "correctAnswerButton bgcolor-B selected"
                            : "correctAnswerButton bgcolor-B"
                    }
                    onclick={() => (questioncontent.correctAnswer = "b")}
                >
                    B
                </button>
                <button
                    type="button"
                    class={
                        questioncontent.correctAnswer == "c"
                            ? "correctAnswerButton bgcolor-C selected"
                            : "correctAnswerButton bgcolor-C"
                    }
                    onclick={() => (questioncontent.correctAnswer = "c")}
                >
                    C
                </button>
                <button
                    type="button"
                    class={
                        questioncontent.correctAnswer == "d"
                            ? "correctAnswerButton bgcolor-D selected"
                            : "correctAnswerButton bgcolor-D"
                    }
                    onclick={() => (questioncontent.correctAnswer = "d")}
                >
                    D
                </button>
            </div>
            <button
                type="button"
                class={"bgcolor-D"}
                onclick={() => removeQuestionById(props.id.toString())}
            >
                Delete Question
            </button>
        </div>
    );})


export class CreateSingleChoiseQuestion extends Component<{ question: Question<SingleChoiceQuestion>, id:string }> {}
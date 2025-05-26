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
            <h3>Question {props.question.position}</h3>
            <label for={`questionText-${question.id}`}>Question-Text:</label>
            <textarea
                id={`questionText-${question.id}`}
                placeholder="Add question Text here..."
            >
                {questioncontent.questionText}
            </textarea>
            <div class="gc-row">
                <div class="gc-col gc-col-6" >
					<div class="input-group-container">
						<p class="input-group-text bgcolor-A">A: </p>
                		<input class="input-field" type="text" placeholder="Answer A" value={answers.a} />
					</div>
                </div>
                <div class="gc-col gc-col-6">
					<div class="input-group-container">
						<p class="input-group-text bgcolor-B" >B: </p>
                		<input class="input-field" type="text" placeholder="Answer B" value={answers.b} />
					</div>               
                </div>
            </div>
            <div class="gc-row">
                <div class="gc-col gc-col-6">
					<div class="input-group-container">
						<p class="input-group-text bgcolor-C">C: </p>
                		<input class="input-field" type="text" placeholder="Answer C" value={answers.c} />
					</div>                
                </div>
                <div class="gc-col gc-col-6">
					<div class="input-group-container">
						<p class="input-group-text bgcolor-D">D: </p>
                		<input class="input-field" type="text" placeholder="Answer D" value={answers.d} />
					</div>                
                </div>
            </div>
            <div class="select-correct-answer">
                <strong style={"margin-right: 10px"}>Correct Answer:</strong>
                <button
                    type="button"
                    class={
                        questioncontent.correctAnswer == "a"
                            ? "btn bgcolor-A selected"
                            : "btn bgcolor-A"
                    }
                    onclick={() => (questioncontent.correctAnswer = "a")}
                >
                    A
                </button>
                <button
                    type="button"
                    class={
                        questioncontent.correctAnswer == "b"
                            ? "btn bgcolor-B selected"
                            : "btn bgcolor-B"
                    }
                    onclick={() => (questioncontent.correctAnswer = "b")}
                >
                    B
                </button>
                <button
                    type="button"
                    class={
                        questioncontent.correctAnswer == "c"
                            ? "btn bgcolor-C selected"
                            : "btn bgcolor-C"
                    }
                    onclick={() => (questioncontent.correctAnswer = "c")}
                >
                    C
                </button>
                <button
                    type="button"
                    class={
                        questioncontent.correctAnswer == "d"
                            ? "btn bgcolor-D selected"
                            : "btn bgcolor-D"
                    }
                    onclick={() => (questioncontent.correctAnswer = "d")}
                >
                    D
                </button>
            </div>
            <button
                type="button"
                class={"btn bgcolor-D"}
                onclick={() => removeQuestionById(props.id.toString())}
            >
                Delete Question
            </button>

        </div>
    );})


export class CreateSingleChoiseQuestion extends Component<{ question: Question<SingleChoiceQuestion>, id:string }> {}
import { Component, template } from "uix/components/Component.ts";
import { SingleChoiceQuestion } from "../../../../../../common/Question.ts";
import { removeQuestionById } from "frontend/src/components/gamecreation/createQuiz/CreateQuiz.tsx"

@template((props) =>  {
	
	const question = props.question as SingleChoiceQuestion;
    const questionContent = $(props.question.content);
    const answers = questionContent.answers;

	return (
        <div class="game-creation-container">
            <h3>Question </h3>
            <label for={`questionText-${question.id}`}>Question-Text:</label>
            <textarea
                id={`questionText-${question.id}`}
                placeholder="Add question Text here..."
            >
                {questionContent.questionText}
            </textarea>
            <div class="gc-row">
                <div class="gc-col gc-col-6" >
					<div class="input-group-container">
						<p class="input-group-text bgcolor-A">A: </p>
                		<input class="input-field" type="text" placeholder="Answer A" value={answers[0]} />
					</div>
                </div>
                <div class="gc-col gc-col-6">
					<div class="input-group-container">
						<p class="input-group-text bgcolor-B" >B: </p>
                		<input class="input-field" type="text" placeholder="Answer B" value={answers[1]} />
					</div>               
                </div>
            </div>
            <div class="gc-row">
                <div class="gc-col gc-col-6">
					<div class="input-group-container">
						<p class="input-group-text bgcolor-C">C: </p>
                		<input class="input-field" type="text" placeholder="Answer C" value={answers[2]} />
					</div>                
                </div>
                <div class="gc-col gc-col-6">
					<div class="input-group-container">
						<p class="input-group-text bgcolor-D">D: </p>
                		<input class="input-field" type="text" placeholder="Answer D" value={answers[3]} />
					</div>                
                </div>
            </div>
            <div class="select-correct-answer">
                <strong style="margin-right: 10px">Correct Answer:</strong>
                <button
                    type="button"
                    class={
                        questionContent.correctAnswerId === 0
                            ? "btn bgcolor-A selected"
                            : "btn bgcolor-A"
                    }
                    onclick={() => questionContent.correctAnswerId = 0
                    }
                >
                    A
                </button>
                <button
                    type="button"
                    class={
                        (questionContent.correctAnswerId === 1)
                            ? "btn bgcolor-B selected"
                            : "btn bgcolor-B"
                    }
                    onclick={() => {questionContent.correctAnswerId = 1}}
                >
                    B
                </button>
                <button
                    type="button"
                    class={
                        questionContent.correctAnswerId === 2
                            ? "btn bgcolor-C selected"
                            : "btn bgcolor-C"
                    }
                    onclick={() => questionContent.correctAnswerId = 2
                    }
                >
                    C
                </button>
                <button
                    type="button"
                    class={
                        questionContent.correctAnswerId === 3
                            ? "btn bgcolor-D selected"
                            : "btn bgcolor-D"
                    }
                    onclick={() => questionContent.correctAnswerId = 3
                    }
                >
                    D
                </button>
            </div>
            <button
                type="button"
                class="btn bgcolor-D"
                onclick={() => removeQuestionById(question.id)}
            >
                Delete Question
            </button>

        </div>
    );})


export class CreateSingleChoiceQuestion extends Component<{ question: SingleChoiceQuestion}> {}
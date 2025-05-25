import { Component, template, style } from "uix/components/Component.ts";
import { SingleChoiceQuestion } from "common/models/question/types/SingleChoiseQuestion.ts";
import { removeQuestionById } from "frontend/src/components/gamecreation/createQuiz/CreateQuiz.tsx"

@template((props) => <section> 

		<div>
			<textarea placeholder={"Question"}> { props.question.questionText }</textarea>
			<div>
				<div>
					<input type="text" placeholder="Answer 1" value={props.question.answers.a} />
				</div>
				<div>
					<input type="text" placeholder="Answer 2" value={props.question.answers.b} />
				</div>
				<div>
					<input type="text" placeholder="Answer 3" value={props.question.answers.c} />
				</div>
				<div>
					<input type="text" placeholder="Answer 4" value={props.question.answers.d} />
				</div>
			</div>
			<div>
				<strong>Richtige Antwort:</strong>
				<button type="button" class={props.question.correctAnswer == 'a' ? 'correctAnswerButton selected' : 'correctAnswerButton'} onclick={ () => props.question.correctAnswer = 'a' }>A</button>
				<button type="button" class={props.question.correctAnswer == 'b' ? 'correctAnswerButton selected' : 'correctAnswerButton'} onclick={ () => props.question.correctAnswer = 'b' }>B</button>
				<button type="button" class={props.question.correctAnswer == 'c' ? 'correctAnswerButton selected' : 'correctAnswerButton'} onclick={ () => props.question.correctAnswer = 'c' }>C</button>
				<button type="button" class={props.question.correctAnswer == 'd' ? 'correctAnswerButton selected' : 'correctAnswerButton'} onclick={ () => props.question.correctAnswer = 'd' } >D</button>
			</div>
			<button type="button" onclick={ () => removeQuestionById(props.id.toString()) }>Delete Question</button>
		</div>	

</section>
)
@style(css`
	.correctAnswerButton{
		margin: 0px 5px;
	}

	.selected {
		background-color:rgb(35, 13, 129);
	}
	
`)

export class CreateSingleChoiseQuestion extends Component<{ question: SingleChoiceQuestion, id:string }> {}
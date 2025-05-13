import { Component, template, style } from "uix/components/Component.ts";
import { SingleChoiceQuestion } from "./SingleChoiseQuestion.ts";

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
		</div>	

</section>
)
@style(css`
	`
)

export class CreateSingleChoiseQuestion extends Component<{ question: SingleChoiceQuestion }> {}
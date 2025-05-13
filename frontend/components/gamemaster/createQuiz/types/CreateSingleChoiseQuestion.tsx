import { Component, template } from "uix/components/Component.ts";
import { SingleChoiceQuestion } from "./SingleChoiseQuestion.ts";

@template((props) => <section> 

	<div>
		<div>
			<textarea class={"form-control"} placeholder={"Question"}> { props.question.questionText }</textarea>
			<div class={"row"}>
				<div class={"col-12"}>
					<input type="text" class={"form-control"} placeholder={"Answer 1"} value={props.question.answers.a} />
				</div>
				<div class={"col-12"}>
					<input type="text" class={"form-control"} placeholder={"Answer 2"} value={props.question.answers.b} />
				</div>
				<div class={"col-12"}>
					<input type="text" class={"form-control"} placeholder={"Answer 3"} value={props.question.answers.c} />
				</div>
				<div class={"col-12"}>
					<input type="text" class={"form-control"} placeholder={"Answer 4"} value={props.question.answers.d} />
				</div>
			</div>
		</div>	
	</div>

</section>
)

export class CreateSingleChoiseQuestion extends Component<{ question: SingleChoiceQuestion }> {}
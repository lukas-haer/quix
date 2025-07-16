import { Component, template, style } from 'uix/components/Component.ts';
import { ObjectRef } from 'datex-core-legacy/runtime/pointers.ts';
import { GameStateObjects, Player, StateOptions } from 'frontend/src/models/GameState.ts';
import { successSnackbarMessage, failureSnackbarMessage } from "frontend/src/components/utils/snackbar/Snackbar.tsx";
import { Separator } from "frontend/src/components/utils/Separator/Separator.tsx";
import { Quiz } from "common/models/Quiz.ts";
import { SingleChoiceQuestion, MultipleChoiceQuestion } from "common/models/Question.ts";

type QuizImportProps = {
	gameStateObjects: ObjectRef<GameStateObjects>;
}

type ImportButtonProps = {
	callback: (quiz: Quiz) => void;
}

@style("../HostMain.css")
@template(({ gameStateObjects }: QuizImportProps) => {
	const currentQuizName = $("")

	return (
		<div class="l-col l-col-6 center-vertically" >
			<Separator text={"or manually import quiz"} />
			<ImportButton callback={(quiz: Quiz) => {
				gameStateObjects.questions = quiz.questions
				currentQuizName.val = quiz.title
			}}/>
			<span style="margin-top: 20px">{currentQuizName.val}</span>
		</div>
	);
})
export class QuizImport extends Component<QuizImportProps> {}

@style("../HostMain.css")
@template(({ callback }: ImportButtonProps) => {

    async function handleImportQuiz() {
        const importInput = document.getElementById("import-quiz-input") as HTMLInputElement
        if(!importInput.value) return //user closed file select
        
		const file = importInput?.files?.[0];
        if(!file) return failureSnackbarMessage("Error", "Quiz file not found.", 2000)
        
			try {
		const text = await file.text()
        const quizObject = JSON.parse(text)
							
			const mappedQuestions = quizObject.questions.map((q: any) => {
				if (q.type === "singlechoice") {
					return new SingleChoiceQuestion(q.content);
				} else if (q.type === "multiplechoice") {
					return new MultipleChoiceQuestion(q.content);
				} else {
					return new SingleChoiceQuestion(q.content) // TODO put in error, now just not done because of the presentation on friday. This is just for legacy
					//throw Error("Not all questions have a type object")
				}
			});
			const questions = mappedQuestions;
			
			const quiz = Quiz ({
				quizId: quizObject.quizId,
				title : quizObject.title,
				description : quizObject.description,
				accountId : "json-import",
				questions : questions
			})
	
		
        if(!quiz) return failureSnackbarMessage("Error", "Failed to parse quiz file content.", 2000)
        
		//TODO: check if quizObject is actually a valid quiz. Currently a lazy check is implemented.
		if (typeof quiz !== "object" || !quiz.questions) return failureSnackbarMessage("Error", "The file does not contain a valid quiz object.")
		
		callback(quiz)
		console.log("Successfully importet quiz: ",quiz);
        successSnackbarMessage("Success", "Quiz import succeeded.", 2000)
			} catch (error) {
			console.error("Error when parsing JSON: ",error);
			failureSnackbarMessage("Import failed","The file could not be importet. Please make sure it is in the right format.")
		}
    }


	return (
			<label class="button">
				<input type="file" accept="application/json" id="import-quiz-input" style={{display: "none"}} onchange={handleImportQuiz}/>
				Import Quiz
			</label>
	);
})
export class ImportButton extends Component<ImportButtonProps> {}
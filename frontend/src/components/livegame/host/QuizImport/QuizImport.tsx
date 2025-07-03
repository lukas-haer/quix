import { Component, template, style } from 'uix/components/Component.ts';
import { ObjectRef } from 'datex-core-legacy/runtime/pointers.ts';
import { GameStateObjects, Player, StateOptions } from 'frontend/src/models/GameState.ts';
import { successSnackbarMessage, failureSnackbarMessage } from "frontend/src/components/utils/snackbar/Snackbar.tsx";
import { Separator } from "frontend/src/components/utils/Separator/Separator.tsx";

type QuizImportProps = {
	gameStateObjects: ObjectRef<GameStateObjects>;
}

@style("../HostMain.css")
@template(({ gameStateObjects }: QuizImportProps) => {
	//TODO: move me into setup screen instead of host waiting screen
	const currentQuizName = $("")

    async function handleImportQuiz() {
        const importInput = document.getElementById("import-quiz-input") as HTMLInputElement
        if(!importInput.value) return //user closed file select
        
		const file = importInput?.files?.[0];
        if(!file) return failureSnackbarMessage("Error", "Quiz file not found.", 2000)
        
		const text = await file.text()
        const quizObject = JSON.parse(text)
        if(!quizObject) return failureSnackbarMessage("Error", "Failed to parse quiz file content.", 2000)
        
		gameStateObjects.questions = quizObject.questions
		currentQuizName.val = file.name
        successSnackbarMessage("Success", "Quiz import succeeded.", 2000)
    }


	return (
		<div class="l-col l-col-6 center-vertically">
			<Separator text={"Manually import quiz"} />
			<span>{currentQuizName.val}</span>
			<label class="button">
				<input type="file" accept="application/json" id="import-quiz-input" style={{display: "none"}} onchange={handleImportQuiz}/>
				Import Quiz
			</label>
		</div>
	);
})
export class QuizImport extends Component<QuizImportProps> {}
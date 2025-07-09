import { Datex } from "datex-core-legacy/datex.ts";
import { Component, template } from 'uix/components/Component.ts';
import { Toggle } from 'frontend/src/components/utils/Toggle/Toggle.tsx';
import { QuizImport } from "frontend/src/components/livegame/host/QuizImport/QuizImport.tsx";
import { ObjectRef } from "datex-core-legacy/runtime/pointers.ts";
import {
  GameStateObjects
} from "frontend/src/models/GameState.ts";
import { successSnackbarMessage, failureSnackbarMessage } from "frontend/src/components/utils/snackbar/Snackbar.tsx";
import { UserLoginPanel } from "frontend/src/components/userAccount/AccountAccess/UserLoginForm.tsx";
//import { getUserQuizzes } from "/backend/SaveQuiz.ts";

type HostSetupScreenProps = {
	state: Datex.Pointer;
	gameStateObjects: ObjectRef<GameStateObjects>;
}

//TODO: use toggles for optional features

@template(async ({ state, gameStateObjects }: HostSetupScreenProps) => {

	// const userQuizzes = await getUserQuizzes();
	// console.log(userQuizzes)

	function proceedToWaiting(){
		if(gameStateObjects.questions.length === 0) return failureSnackbarMessage("Error", "Please import a quiz that contains questions.", 2000)
		state.val = "waiting"
	}

	//TODO: check if user is already logged in
	//TODO: display user quizzes if logged in
	return (
		<div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "2vh"}}>
			<h2>Setup</h2>
			<button onclick={proceedToWaiting}>Proceed to Lobby</button>
			<UserLoginPanel text={"LOG IN TO BROWSE YOUR QUIZZES"} />
			<QuizImport gameStateObjects={gameStateObjects} />
		</div>
	);
})
export class HostSetupScreen extends Component<HostSetupScreenProps> {}
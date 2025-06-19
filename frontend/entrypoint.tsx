import MainMenu from "./src/components/MainMenu/MainMenu.tsx";
import HostDashboard from "./src/components/host/HostDashboard/HostDashboard.tsx";
import JoinScreen from "./src/components/player/JoinScreen/JoinScreen.tsx";
import { CreateQuiz } from './src/components/gamecreation/createQuiz/CreateQuiz.tsx';

//import type { Entrypoint } from "uix/providers/entrypoints.ts"
//import { authenticate } from "backend/data.ts";
import { userLogin } from "./src/components/UserAccountForms/UserLoginForm.tsx";
import { userSignUp } from "./src/components/UserAccountForms/UserSignUpForm.tsx";


export default {
    "/": () => <MainMenu />,
    "/join/:id": (_: any, { id }:{ id: string }) => <JoinScreen id={ id } />,
    "/join": () => <JoinScreen />,
    "/create": () => <HostDashboard />,
    "/quiz": () => <CreateQuiz />,
	"/login": userLogin,
	"/signup": userSignUp
};


/*
export default {
		"/": <div>
			<h1>Welcome to QUIX!</h1>
			<a href="/login"><button type="button" id="login-btn">Log into your existing account</button></a>
			<a href="/signup"><button type="button" id="signup-btn">Create a new account</button></a>
		</div>,

		"/login": userLogin,
		"/signup": userSignUp

	//"/create-quiz": <CreateQuiz/>,
} satisfies Entrypoint;
 */
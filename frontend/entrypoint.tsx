import { MainMenu } from "./src/components/MainMenuC/MainMenu.tsx";
import { setupHost } from "frontend/src/components/livegame/host/HostMain.tsx";
import { PlayerMain } from "frontend/src/components/livegame/player/PlayerMain.tsx";
import { CreateQuiz } from './src/components/gamecreation/createQuiz/CreateQuiz.tsx';

import { userLoginForm } from "./src/components/userAccount/UserLoginForm.tsx";
import { userSignUpForm } from "./src/components/userAccount/UserSignUpForm.tsx";
import AccountPage from "frontend/AccountPage.tsx";

export default {
    "/": () => <MainMenu />,
    "/join/:id": (_: any, { id }:{ id: string }) => <PlayerMain id={ id } />,
    "/join": () => redirect('/'),
  "/host/:quizId": (_: any, { quizId }: { quizId: string }) => setupHost(quizId),
    "/createQuiz": () => <CreateQuiz />,
	"/login": userLoginForm,
	"/signup": userSignUpForm,
     "/account/:userId": (_: any, { userId }: { userId: string }) => <AccountPage userId={userId}/>
};

//    "/host/:quizId": (_: any, { quizId }: { quizId: string }) => <HostMain quizId={quizId}/>,

import { MainMenu } from "./src/components/MainMenu/MainMenu.tsx";
import { HostMain } from "frontend/src/components/livegame/host/HostMain.tsx";
import { PlayerMain } from "frontend/src/components/livegame/player/PlayerMain.tsx";
import { CreateQuiz } from './src/components/gamecreation/createQuiz/CreateQuiz.tsx';

import { UserLoginForm } from "frontend/src/components/userAccount/AccountAccess/UserLoginForm.tsx";
import { UserSignUpForm } from "./src/components/userAccount/AccountAccess/UserSignUpForm.tsx";
import { AccountPage } from "frontend/src/components/userAccount/AccountPage/AccountPage.tsx";

export default {
    "/": () => <MainMenu />,
    "/join/:id": (_: any, { id }:{ id: string }) => <PlayerMain id={ id } />,
    "/join": () => redirect('/'),
    "/host/:quizId": (_: any, { quizId }:{ quizId: string }) => <HostMain quizId={ quizId } />,
    "/host": <HostMain quizId={""}/>,
   
    "/createQuiz": () => <CreateQuiz />,
	"/login": <UserLoginForm/>,
	"/signup": <UserSignUpForm/>,
    "/account/:userId": (_: any, { userId }: { userId: string }) => <AccountPage userId={userId}/>
};

//"/host/:quizId": (_: any, { quizId }: { quizId: string }) => setupHost(quizId),
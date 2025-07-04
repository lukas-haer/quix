import MainMenu from "./src/components/MainMenu/MainMenu.tsx";
import HostDashboard from "./src/components/host/HostDashboard/HostDashboard.tsx";
import JoinScreen from "./src/components/player/JoinScreen/JoinScreen.tsx";
import { CreateQuiz } from './src/components/gamecreation/createQuiz/CreateQuiz.tsx';

import { userLoginForm } from "./src/components/UserAccountForms/UserLoginForm.tsx";
import { userSignUpForm } from "./src/components/UserAccountForms/UserSignUpForm.tsx";
import AccountPage from "frontend/AccountPage.tsx";

export default {
    "/": () => <MainMenu />,
    "/join/:id": (_: any, { id }:{ id: string }) => <JoinScreen id={ id } />,
    "/join": () => <JoinScreen />,
    "/create": () => <HostDashboard />,
    "/createQuiz": () => <CreateQuiz />,
	"/login": userLoginForm,
	"/signup": userSignUpForm,
     "/account/:userId": (_: any, { userId }: { userId: string }) => <AccountPage userId={userId}/>

};
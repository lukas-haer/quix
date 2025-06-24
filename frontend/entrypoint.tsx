import {MainMenu} from "./src/components/MainMenu/MainMenu.tsx";
import {HostDashboard} from "./src/components/host/HostDashboard/HostDashboard.tsx";
import JoinScreen from "./src/components/player/JoinScreen/JoinScreen.tsx";
import { CreateQuiz } from './src/components/gamecreation/createQuiz/CreateQuiz.tsx';

export default {
    "/": () => <MainMenu />,
    "/join/:id": (_: any, { id }:{ id: string }) => <JoinScreen id={ id } />,
    "/join": () => <JoinScreen />,
    "/create": () => <HostDashboard />,
    "/quiz": () => <CreateQuiz />
};

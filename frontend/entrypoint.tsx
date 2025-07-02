import { MainMenu } from "frontend/src/components/mainmenue/MainMenu.tsx";
import { HostMain } from "frontend/src/components/livegame/host/HostMain.tsx";
import { PlayerMain } from "frontend/src/components/livegame/player/PlayerMain.tsx";
import { CreateQuiz } from './src/components/gamecreation/createQuiz/CreateQuiz.tsx';
import {
    PlayerFinishedScreen
} from "./src/components/livegame/player/GameScreen/PlayerFinishedScreen/PlayerFinishedScreen.tsx";

export default {
    "/": () => <PlayerFinishedScreen />,
    "/join/:id": (_: any, { id }:{ id: string }) => <PlayerMain id={ id } />,
    "/join": () => redirect('/'),
    "/host": () => <HostMain />,
    "/create": () => <CreateQuiz />,
};

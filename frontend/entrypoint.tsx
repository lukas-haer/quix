import MainMenu from "frontend/src/components/MainMenu/MainMenu.tsx";
import JoinScreen from "frontend/src/components/player/JoinScreen/JoinScreen.tsx";
import HostDashboard from "frontend/src/components/host/HostDashboard/HostDashboard.tsx";
import { CreateQuiz } from "frontend/src/components/gamecreation/createQuiz/CreateQuiz.tsx";
import Wrapper from "frontend/Wrapper.tsx";
import Testing from "frontend/Testing.tsx";


export default {
      "/": () => <MainMenu />,
          "/join/:id": (_:any, {id}:{ id:string }) => <Wrapper><JoinScreen id={id}/></Wrapper>,
          "/join": () => <Wrapper><JoinScreen/></Wrapper>,
          "/create": () => <Wrapper><HostDashboard/></Wrapper>,
          "/quiz": () => <Wrapper><CreateQuiz/></Wrapper>,
};
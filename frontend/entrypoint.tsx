import MainMenu from "./src/components/MainMenu/MainMenu.tsx";
import GameConatiner from "./src/components/player/GameContainer/GameConatiner.tsx";
import AnswerScreen from "./src/components/player/AnswerScreen/AnswerScreen.tsx";
import HostDashboard from "./src/components/host/HostDashboard.tsx";
import JoinScreen from "./src/components/player/JoinScreen/JoinScreen.tsx";


export default {
    "/": () => <MainMenu />,
    "/join": () => <JoinScreen handleJoin={() => {}} />,
    "/create": () => <HostDashboard />,
    "/test": () => <AnswerScreen
      correct={true}
      currentScore={15}
      howManyQuestionsCorrect={2}
      howManyQuestionsTotal={5}
    />,
    "/test2": () => <AnswerScreen
      correct={false}
      currentScore={15}
      howManyQuestionsCorrect={2}
      howManyQuestionsTotal={5}
    />
};

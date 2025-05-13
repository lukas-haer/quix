import MainMenu from "./src/components/MainMenu/MainMenu.tsx";
import GameConatiner from "./src/components/player/GameContainer/GameConatiner.tsx";
import AnswerScreen from "./src/components/player/AnswerScreen/AnswerScreen.tsx";



export default {
    "/": () => <MainMenu />,
    "/join": () => <GameConatiner />,
    "/create": () => <div>... everything missing here</div>,
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

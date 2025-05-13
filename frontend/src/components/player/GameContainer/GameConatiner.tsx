import {sampleQuestion} from "../../../models/Question.ts";
import JoinScreen from "../JoinScreen/JoinScreen.tsx";
import WaitingForLobbyStartScreen from "../WaitingForLobbyStartScreen/WaitingForLobbyStartScreen.tsx";
import QuestionScreen from "../QuestionScreen/QuestionScreen.tsx";
import AnswerScreen from "../AnswerScreen/AnswerScreen.tsx";


export type GamePhases = "join" | "waiting" | "playing" | "answer" | "finished";

export default function GameConatiner() {
    const gamePhase = $("join");
    const masterFunctionID = $("");

    function handleJoin(name:string, id:string) {
        gamePhase.val = "waiting"
    }

    return (
      <>
          {(gamePhase.val == "join") &&
          <JoinScreen handleJoin={handleJoin}/>
          }
          {(gamePhase.val == "waiting") &&
          <WaitingForLobbyStartScreen/>
          }
          {(gamePhase.val == "question") &&
          <QuestionScreen
          question={sampleQuestion}
          sendAnswer={(a:number) => console.log("Selected:", a)}
          />
          }
          {(gamePhase.val == "answer") &&
          <AnswerScreen
          correct={false}
          currentScore={15}
          howManyQuestionsCorrect={2}
          howManyQuestionsTotal={5}
          />
          }
          {(gamePhase.val == "finished") &&
          <div>
            //TODO Finished Screen
          </div>
          }
      </>
    );
}
import { Datex } from "datex-core-legacy/datex.ts";
import { Component, template } from 'uix/components/Component.ts';
import { ObjectRef } from "datex-core-legacy/runtime/pointers.ts";
import { GetCurrentQuestionReturn } from "../../../../models/PlayerApiReturns.ts";
import { PlayerAPIType } from "../PlayerMain.tsx";
import { QuestionScreen } from "./QuestionScreen/QuestionScreen.tsx";
import { LoadingScreen } from "frontend/src/components/utils/loadingscreen/LoadingScreen.tsx";
import {PlayerFinishedScreen} from "./PlayerFinishedScreen/PlayerFinishedScreen.tsx";
import {PlayerSolutionScreen} from "./PlayerSolutionScreen/PlayerSolutionScreen.tsx";

type GameScreenProps = {
	stateId: string;
	currentRoundId: string;
	apiObj: ObjectRef<{playerApi?: PlayerAPIType}>;
}

@template(async ({stateId, currentRoundId, apiObj}: GameScreenProps) => {
  //TODO: error handling
  const state: Datex.Pointer<string> = await datex.get(`$${stateId}`)
  const currentRound: Datex.Pointer<number> = await datex.get(`$${currentRoundId}`)
  const gameState: Datex.Pointer<string> = $("waiting");

  //TODO: Maybe we can just grab the pointer references instead of manually calling the endpoint.
  const question: Datex.Pointer<string> = $("");
  const answers: Datex.Pointer<string> = $("");
  const currentDeadline: Datex.Pointer<number> = $(0);

  const points = $(0);

  const submittedAnswer = $(false);

  async function updateQuestionAndAnswers(){
    if(!apiObj.playerApi) throw Error("PlayerAPI not defined.")
    const res: GetCurrentQuestionReturn = await apiObj.playerApi.getCurrentQuestion();

    question.val = res.questionText;
    answers.val = res.answers.join(";"); //To avoid using ObjectRef
    currentDeadline.val = res.currentDeadline.getTime(); //To avoid using ObjectRef
    // console.log("DCD: ",currentDeadline.val);

    submittedAnswer.val = false;
  }

  // gameState keeps the player in finished screen even if host starts a new round
  state.observe((v) => {
    if(v === "finished" || gameState.val === "finished") {
      gameState.val = "finished";
      return;
    }
    else if (v === "waiting") {
      return;
    }

    
    gameState.val = v;
    updateQuestionAndAnswers();
  })

  
  currentRound.observe(() => { 
    if (gameState.val === "finished") return;
    updateQuestionAndAnswers();
  })

  async function submitAnswer(answerId: number){
    if(!apiObj.playerApi) throw Error("PlayerAPI not defined.")
    const newPoints = await apiObj.playerApi.submitAnswer(answerId);
    if(newPoints > points.val){
      points.val = newPoints;
    }
  }

  async function getScoreboard(){
    if(!apiObj.playerApi) throw Error("PlayerAPI not defined.")
    const scoreboard = await apiObj.playerApi.getScoreboard();
    return scoreboard
  }

  async function getName(){
    if(!apiObj.playerApi) throw Error("PlayerAPI not defined.")
    const name = await apiObj.playerApi.whoAmI();
    return name
  }


  /*
  TODO: implement
       <h2>State: {state.val}</h2>
      <h2>Round: {currentRound.val}</h2>
      <h2>Points: {points.val}</h2>

  */

  return (
    <div>
      {
        gameState.val === "waiting" && <LoadingScreen text="You're in!" subtext="Now wait for the game to start..." />
      }
      {
        gameState.val === "question" && (
          <QuestionScreen
            questionText={question.val}
            answers={answers.val}
            currentDeadline={currentDeadline.val}
            submittedAnswer={submittedAnswer}
            submitAnswer={submitAnswer}
          />
        )
      }
      {
        gameState.val === "solution" && (
          <PlayerSolutionScreen />
        )
      }
      {
        gameState.val == "finished" && <PlayerFinishedScreen getScoreboard={getScoreboard} getName={getName}/> 
      }
    </div>
  )
})
export class GameScreen extends Component<GameScreenProps> {}
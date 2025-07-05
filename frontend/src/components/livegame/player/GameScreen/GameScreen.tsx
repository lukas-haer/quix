import { Datex } from "datex-core-legacy/datex.ts";
import { Component, template } from 'uix/components/Component.ts';
import { ObjectRef } from "datex-core-legacy/runtime/pointers.ts";
import { GetCurrentQuestionReturn } from "../../../../models/PlayerApiReturns.ts";
import { PlayerAPIType } from "../PlayerMain.tsx";
import { QuestionScreen } from "./QuestionScreen/QuestionScreen.tsx";
import { LoadingScreen } from "frontend/src/components/utils/loadingscreen/LoadingScreen.tsx";

type GameScreenProps = {
	stateId: string;
	currentRoundId: string;
	apiObj: ObjectRef<{playerApi?: PlayerAPIType}>;
}

@template(async ({stateId, currentRoundId, apiObj}: GameScreenProps) => {
  //TODO: error handling
  const state: Datex.Pointer<string> = await datex.get(`$${stateId}`)
  const currentRound: Datex.Pointer<number> = await datex.get(`$${currentRoundId}`)

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
    console.log("DCD: ",currentDeadline.val);
    
    submittedAnswer.val = false;
  }

  state.observe((v) => {
    if(v !== "playing") return;
    updateQuestionAndAnswers();
  })
  currentRound.observe(() => { updateQuestionAndAnswers() })

  async function submitAnswer(answerId: number){
    if(!apiObj.playerApi) throw Error("PlayerAPI not defined.")
    const newPoints = await apiObj.playerApi.submitAnswer(answerId);
    if(newPoints > points.val){
      points.val = newPoints;
    }
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
        state.val === "waiting" && <LoadingScreen text="You're in!" subtext="Now wait for the game to start..." />
      }
      {
        state.val === "playing" && (
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
        state.val === "finished" && <h2>The game has finished.</h2>
      }
    </div>
  )
})
export class GameScreen extends Component<GameScreenProps> {}
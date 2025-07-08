import { Datex } from "datex-core-legacy/datex.ts";
import { ObjectRef } from "datex-core-legacy/runtime/pointers.ts";
import { GameStateObjects } from "frontend/src/models/GameState.ts";
import { Component, template } from "uix/components/Component.ts";

//TODO: why does pointer to currentRound not update this component anymore after changing to uix format?
type HostPlayingScreenProps = {
  state: Datex.Pointer;
  currentRound: Datex.Pointer;
  gameStateObjects: ObjectRef<GameStateObjects>;
  showSolutions: () => void;
};

@template(
  function ({ showSolutions, state, currentRound, gameStateObjects }: HostPlayingScreenProps) {

    // This needs to exist because trying to get the questionText directly in html doesn't work with changing currentRound.val
    function getCurrentQuestion() {
      return gameStateObjects.questions[currentRound.val].content.questionText;
    }
    function getCurrentAnswer(answerID : number){
      return gameStateObjects.questions[currentRound.val].content.answers[answerID];;
    }

    return (
      <div class="section">
        <h1>{currentQuestion.content.questionText}</h1>
        <div class="answer-container">
            <div class="answer answer1"><span class="icon icon0"/>{currentQuestion.content.answers[0]}</div>
            <div class="answer answer2"><span class="icon icon1"/>{currentQuestion.content.answers[1]}</div>
            <div class="answer answer3"><span class="icon icon2"/>{currentQuestion.content.answers[2]}</div>
            <div class="answer answer4"><span class="icon icon3"/>{currentQuestion.content.answers[3]}</div>
        </div>
        <div class="timer" id="timer">Hier noch Logik für den Timer</div>
        {/* <h2>Current Deadline:</h2>
        <p>{gameStateObjects.currentDeadline.toString()}</p> */}
        <button
          class="button"
          type="button"
          onclick={() => {
            showSolutions();
          }}
        >
          Skip Question
        </button>currentQuestion

        <div class="countdown-bar" id="countdownBar" style={`animation: countdown ${currentQuestion.content.timeInSeconds}s linear forwards`}/>
      </div>
    );
  },
)
export class HostPlayingScreen extends Component<{
  state: Datex.Pointer;
  currentRound: Datex.Pointer;
  gameStateObjects: ObjectRef<GameStateObjects>;
    showSolutions: () => void;
}> {}

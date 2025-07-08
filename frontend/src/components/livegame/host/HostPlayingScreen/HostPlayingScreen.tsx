import { Datex } from "datex-core-legacy/datex.ts";
import { ObjectRef } from "datex-core-legacy/runtime/pointers.ts";
import { GameStateObjects } from "frontend/src/models/GameState.ts";
import { Component, template } from "uix/components/Component.ts";

//TODO: why does pointer to currentRound not update this component anymore after changing to uix format?
type HostPlayingScreenProps = {
  state: Datex.Pointer;
  currentRound: Datex.Pointer;
  gameStateObjects: ObjectRef<GameStateObjects>;
};

@template(({ state, currentRound, gameStateObjects }: HostPlayingScreenProps) => {
    const timeoutID: Datex.Pointer<number> = $(0);

    const startGame = () => {
      updateDeadlineAndTimer();
    };

    const nextRound = () => {
      if (currentRound.val + 1 === gameStateObjects.questions.length) {
        state.val = "finished";
        return;
      }

      console.log(currentQuestion);
      

      updateDeadlineAndTimer();
      currentRound.val++;
    };

    const updateDeadlineAndTimer = () => {
      
      const newDeadline = new Date(Date.now() + gameStateObjects.questions[currentRound.val].content.timeInSeconds * 1000);

      gameStateObjects.currentDeadline = newDeadline;

      timeoutID.val = setTimeout(
        nextRound,
        gameStateObjects.currentDeadline.getTime() - Date.now(),
      );
    };

    const currentQuestion = always(() => gameStateObjects.questions[currentRound.val])

    startGame();

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
            clearTimeout(timeoutID.val);
            nextRound();
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
}> {}

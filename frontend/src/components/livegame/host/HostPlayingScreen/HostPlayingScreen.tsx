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

@template(
  function ({ state, currentRound, gameStateObjects }: HostPlayingScreenProps) {
    const timeoutID: Datex.Pointer<number> = $(0);
    const solutionScreenTimeInSeconds: number = 10;
    let solutionPhase: boolean = false;

    const startGame = () => {
      updateDeadlineAndTimer();
    };

    const nextRound = () => {
      if (currentRound.val + 1 === gameStateObjects.questions.length) {
        state.val = "finished";
        return;
      }

      updateDeadlineAndTimer();
      currentRound.val++;
    };

    const updateDeadlineAndTimer = () => {
        const questionTime = gameStateObjects.questions[currentRound.val].content.timeInSeconds
        console.log(questionTime)
      // Can you do this more smoothly? an easy to understand one-liner perhaps?
      const newDeadline = new Date();
      newDeadline.setSeconds(
        newDeadline.getSeconds() + questionTime + solutionScreenTimeInSeconds,
      );
      gameStateObjects.currentDeadline = newDeadline;

      const altNewDeadline = new Date(new Date().getTime() + (questionTime + solutionScreenTimeInSeconds) * 1000);
      console.log(newDeadline)
      console.log(altNewDeadline)

      timeoutID.val = setTimeout(
        nextRound,
          newDeadline.getTime() - Date.now(),
      );
       setTimeout(
          ()=>{solutionPhase = true},
          newDeadline.getTime() - Date.now()-solutionScreenTimeInSeconds,
      )
    };

    // This needs to exist because trying to get the questionText directly in html doesn't work with changing currentRound.val
    function getCurrentQuestion() {
      return gameStateObjects.questions[currentRound.val].content.questionText;;
    }

    startGame();

    return (
        <>

      <div>
        <h2>Current Question:</h2>
        <p>
          {getCurrentQuestion()}
        </p>
        <h2>Current Deadline:</h2>
        <p>{gameStateObjects.currentDeadline.toString()}</p>
        <button
          type="button"
          onclick={() => {
            clearTimeout(timeoutID.val);
            nextRound();
          }}
        >
          Skip Question
        </button>
      </div>

        </>
    );
  },
)
export class HostPlayingScreen extends Component<{
  state: Datex.Pointer;
  currentRound: Datex.Pointer;
  gameStateObjects: ObjectRef<GameStateObjects>;
}> {}

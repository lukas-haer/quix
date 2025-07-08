import { ObjectRef } from "datex-core-legacy/runtime/pointers.ts";
import { GameStateObjects } from "frontend/src/models/GameState.ts";
import { Component, template } from "uix/components/Component.ts";

//TODO: why does pointer to currentRound not update this component anymore after changing to uix format?
type HostPlayingScreenProps = {
  currentRound: number;
  gameStateObjects: ObjectRef<GameStateObjects>;
  showSolutions: () => void;
};

@template( ({ showSolutions, currentRound, gameStateObjects }: HostPlayingScreenProps) => {

    const currentQuestion = always(() => gameStateObjects.questions[currentRound])
     
    
    const timeLeft = $(Math.floor((gameStateObjects.currentDeadline.getTime() - Date.now() )/ 1000)+1)

    const updateTimerIntervalId = setInterval(() => {
      timeLeft.val = Math.floor((gameStateObjects.currentDeadline.getTime() - Date.now() )/ 1000) + 1
    },50)

    return (
      <main>
        <h1>{currentQuestion.content.questionText}</h1>
        <div class="answer-container">
            <div class="answer answer1"><span class="icon icon0"/>{currentQuestion.content.answers[0]}</div>
            <div class="answer answer2"><span class="icon icon1"/>{currentQuestion.content.answers[1]}</div>
            <div class="answer answer3"><span class="icon icon2"/>{currentQuestion.content.answers[2]}</div>
            <div class="answer answer4"><span class="icon icon3"/>{currentQuestion.content.answers[3]}</div>
        </div>
        <div class="timer" id="timer">{timeLeft}</div>      
        <button
          class="button"
          type="button"
          onclick={() => {
            clearInterval(updateTimerIntervalId)
            showSolutions();
          }}
        >
          Skip Question
        </button>

        <div class="countdown-bar" id="countdownBar" style={`animation: countdown ${currentQuestion.content.timeInSeconds}s linear forwards`}/>
      </main>
    );
  },
)
export class HostPlayingScreen extends Component<HostPlayingScreenProps> {}

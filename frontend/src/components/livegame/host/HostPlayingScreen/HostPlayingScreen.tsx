import { ObjectRef } from 'datex-core-legacy/runtime/pointers.ts';
import { GameStateObjects } from 'frontend/src/models/GameState.ts';
import { Component, template } from 'uix/components/Component.ts';

//TODO: why does pointer to currentRound not update this component anymore after changing to uix format?
type HostPlayingScreenProps = {
    currentRound: number;
    gameStateObjects: ObjectRef<GameStateObjects>;
    showSolutions: () => void;
};

@template(({ showSolutions, currentRound, gameStateObjects }: HostPlayingScreenProps) => {
    const currentQuestion = always(() => gameStateObjects.questions[currentRound]);

    const timeLeft = $(Math.floor((gameStateObjects.currentDeadline.getTime() - Date.now()) / 1000) + 1);

    const updateTimerIntervalId = setInterval(() => {
        timeLeft.val = Math.floor((gameStateObjects.currentDeadline.getTime() - Date.now()) / 1000) + 1;
    }, 50);

    function getQuestionTextFontSize(): string {
        const questionLength = currentQuestion.content.questionText.length;
        let fontSize = "35px";
        if (questionLength > 200) {
          fontSize = "30px"
        } 
        if (questionLength > 250) {
          fontSize = "26px"
        }
        return fontSize
    }

    return (
        <main>
          <div class="top flex-center">
            <div class="host-question-container">
                <h1 style={{ fontSize: getQuestionTextFontSize() }}>{currentQuestion.content.questionText}</h1>
            </div>
          </div>
          <div class="horizontally-center">
            <div class="answer-container flex-center">
                <div class="answer answer1">
                    <span class="icon icon0" />
                    <p class="answer-text">
                      {currentQuestion.content.answers[0]}
                    </p>
                </div>
                <div class="answer answer2">
                    <span class="icon icon1" />
                    <p class="answer-text">
                      {currentQuestion.content.answers[1]}
                    </p>
                </div>
                <div class="answer answer3">
                    <span class="icon icon2" />
                    <p class="answer-text">
                      {currentQuestion.content.answers[2]}
                    </p>
                </div>
                <div class="answer answer4">
                    <span class="icon icon3" />
                    <p class="answer-text">
                      {currentQuestion.content.answers[3]}
                    </p>
                </div>
            </div>
          </div>
            <div class="top-right-controls">
                <div class="timer flex-center" id="timer">
                    300
                </div>
                <button
                    class="skip-button flex-center"
                    type="button"
                    onclick={() => {
                        clearInterval(updateTimerIntervalId);
                        showSolutions();
                    }}
                >
                    Skip
                </button>
            </div>
            <div
                class="countdown-bar"
                id="countdownBar"
                style={`animation: countdown ${currentQuestion.content.timeInSeconds}s linear forwards`}
            />
        </main>
    );
})
export class HostPlayingScreen extends Component<HostPlayingScreenProps> {}

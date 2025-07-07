import {Datex} from "datex-core-legacy/datex.ts";
import {Component, template} from "uix/components/Component.ts";
import {GameStateObjects} from "../../../../models/GameState.ts";
import {ObjectRef} from "datex-core-legacy/runtime/pointers.ts";
import {
    MultipleChoiceQuestion,
    SingleChoiceQuestion,
} from "../../../../../../common/models/Question.ts";
import {SingleChoiceQuestionSolution} from "./solutionComponents/SingleChoiceQuestionSolution.tsx";


type HostSolutionScreenProps = {
    state: Datex.Pointer;
    getScoreboard: () => { name: string; points: number }[];
    currentRound: Datex.Pointer;
    gameStateObjects: ObjectRef<GameStateObjects>;
};

@template(
    function ({state, getScoreboard, currentRound, gameStateObjects}: HostSolutionScreenProps) {

        function getCurrentQuestion() {
            return gameStateObjects.questions[currentRound.val].content;
        }

        const nextRound = () => {
            if (currentRound.val + 1 === gameStateObjects.questions.length) {
                state.val = "finished";
                return;
            }
            updateDeadlineAndTimer();
            currentRound.val++;
            state.val = "question"
        };

        const updateDeadlineAndTimer = () => {
            // Can you do this more smoothly? an easy to understand one-liner perhaps?
            const newDeadline = new Date();
            newDeadline.setSeconds(
                newDeadline.getSeconds() +
                gameStateObjects.questions[currentRound.val].content.timeInSeconds,
            );
            gameStateObjects.currentDeadline = newDeadline;

            setTimeout(
                nextRound,
                gameStateObjects.currentDeadline.getTime() - Date.now(),
            );
        };

        const numberOfTopPlayersShown = 5;
        const question = getCurrentQuestion()
        const scoreboard = getScoreboard().slice(0, numberOfTopPlayersShown);

        console.log(question)

        return (
            <div class="solution-screen-container">
                <div class="left">
                    <SingleChoiceQuestionSolution currentRound={currentRound} gameStateObjects={gameStateObjects} style={{width: "100%"}} />
                </div>
                <div class="right">
                    <div class="scoreboard-title">Top {Math.min(numberOfTopPlayersShown, scoreboard.length)} Players</div>
                    <div class="scoreboard" id="scoreboard"></div>
                    {scoreboard.map((player, index) => (
                        <div class="score-entry">
                            <span>#{index + 1} {player.name} </span>
                            <span>{player.points} pts</span>
                        </div>
                    ))}
                </div>
                <div class="countdown-bar" id="countdownBar"></div>
            </div>
        );
    },
)
export class HostSolutionScreen extends Component<HostSolutionScreenProps> {
}





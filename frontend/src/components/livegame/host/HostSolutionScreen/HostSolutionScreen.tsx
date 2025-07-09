import {Datex} from "datex-core-legacy/datex.ts";
import {Component, template} from "uix/components/Component.ts";
import {GameStateObjects} from "frontend/src/models/GameState.ts";
import {ObjectRef} from "datex-core-legacy/runtime/pointers.ts";
import {SingleChoiceQuestionSolution} from "./solutionComponents/SingleChoiceQuestionSolution.tsx";


type HostSolutionScreenProps = {
    nextQuestion: () => void;
    getScoreboard: () => { name: string; points: number }[];
    state: Datex.Pointer;
    currentRound: number;
    gameStateObjects: ObjectRef<GameStateObjects>;
};

@template(
    function ({nextQuestion, getScoreboard, currentRound, gameStateObjects}: HostSolutionScreenProps) {

        const numberOfTopPlayersShown = 5;
        const scoreboard = getScoreboard().slice(0, numberOfTopPlayersShown);

        return (
            <div class="solution-screen-container">
                <div class="left">
                    <SingleChoiceQuestionSolution currentRound={currentRound} gameStateObjects={gameStateObjects} style={{width: "100%"}} />
                </div>
                <div class="right">
                    <div class="scoreboard-title">Scoreboard{/* Top {Math.min(numberOfTopPlayersShown, scoreboard.length)} Players */}</div>
                    <div class="scoreboard" id="scoreboard"></div>
                    {scoreboard.map((player, index) => (
                        <div class="score-entry">
                            <span>#{index + 1} {player.name} </span>
                            <span>{player.points} pts</span>
                        </div>
                    ))}
                    <button type="button" class="button" onclick={nextQuestion}>Next</button>
                </div>
            </div>
        );
    },
)
export class HostSolutionScreen extends Component<HostSolutionScreenProps> {
}





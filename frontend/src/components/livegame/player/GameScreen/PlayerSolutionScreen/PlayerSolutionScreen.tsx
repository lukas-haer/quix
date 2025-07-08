import {Component, template} from "uix/components/Component.ts";

type PlayerSolutionScreenProps = {};


@template(async function () {

    return (
        <div class="player-solution-container">
            <h1>Next Question Coming Up</h1>
            <h3>Stay focused, the game continues shortly</h3>
            <h4>Check the main screen for answers</h4>
        </div>
    );
})

export class PlayerSolutionScreen extends Component<PlayerSolutionScreenProps> {
}

type HostPlayingScreenProps = {
    state: Datex.Pointer;
    currentRound: Datex.Pointer;
    gameStateObjects: ObjectRef<GameStateObjects>;
};

@template(
    function ({state, currentRound, gameStateObjects}: HostPlayingScreenProps) {

        const topPlayers = [
            {name: "PlayerOne", score: 3200},
            {name: "PlayerTwo", score: 2900},
            {name: "PlayerThree", score: 2600}
        ];

        const scoreboardContainer = document.getElementById('scoreboard');

        topPlayers.forEach((player, index) => {
            const entry = document.createElement('div');
            entry.className = 'score-entry';
            entry.innerHTML = `
        <span>#${index + 1} ${player.name}</span>
        <span>${player.score} pts</span>
      `;
            scoreboardContainer.appendChild(entry);
        });

        // Show alert when 10s countdown is over
        setTimeout(() => {
            alert("Time's up!");
        }, 10000);


        function getCurrentQuestion() {
            return gameStateObjects.questions[currentRound.val].content.questionText;;
        }


        return (
            <>
                <div className="left">
                    <h1>WHAT IS YOUR FAVORITE COLOR?</h1>
                    <div className="answer-container">
                        <div className="answer correct">Green</div>
                        <div className="answer incorrect">Blue</div>
                        <div className="answer incorrect">Yellow</div>
                        <div className="answer incorrect">Red</div>
                    </div>
                </div>
                <div class="right">
                    <div class="scoreboard-title">Top 3 Players</div>
                    <div class="scoreboard" id="scoreboard"></div>
                </div>

                <!-- Countdown bar -->
                <div class="countdown-bar" id="countdownBar"></div>
            </>
        );
    },
)
export class HostPlayingScreen extends Component<{
    state: Datex.Pointer;
    currentRound: Datex.Pointer;
    gameStateObjects: ObjectRef<GameStateObjects>;
}> {
}





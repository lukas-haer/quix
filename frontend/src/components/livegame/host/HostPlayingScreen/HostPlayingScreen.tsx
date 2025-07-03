import { Datex } from "datex-core-legacy/datex.ts";
import { ObjectRef } from "datex-core-legacy/runtime/pointers.ts";
import { GameStateObjects } from "frontend/src/models/GameState.ts";
import { Component, template } from 'uix/components/Component.ts';


//TODO: why does pointer to currentRound not update this component anymore after changing to uix format?
type HostPlayingScreenProps = {
	currentRound: number;
	gameStateObjects: ObjectRef<GameStateObjects>;
}

@template(function ({currentRound, gameStateObjects}: HostPlayingScreenProps) {
return (
  <body>
      <div class="section">
        <h1>{gameStateObjects.questions[currentRound].content.questionText}</h1>
        <div class="answer-container">
            <div class="answer answer1">{gameStateObjects.questions[currentRound].content.answers[0]}</div>
            <div class="answer answer2">{gameStateObjects.questions[currentRound].content.answers[1]}</div>
            <div class="answer answer3">{gameStateObjects.questions[currentRound].content.answers[2]}</div>
            <div class="answer answer4">{gameStateObjects.questions[currentRound].content.answers[3]}</div>
        </div>
        {/* <p>{gameStateObjects.questions[currentRound].content.questionText}</p>
        <h2>Current Deadline:</h2>
        <p>{gameStateObjects.currentDeadline.toString()}</p>
        <p>{gameStateObjects.questions[currentRound].content.answers[1]}</p> */}
        <div class="countdown-bar" id="countdownBar"></div>
      </div>
  </body>
      
  )
})
export class HostPlayingScreen extends Component<HostPlayingScreenProps> {}
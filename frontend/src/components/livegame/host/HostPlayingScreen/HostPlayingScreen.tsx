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
      <div>
        <h2>Current Question:</h2>
        <p>{gameStateObjects.questions[currentRound].content.questionText}</p>
        <h2>Current Deadline:</h2>
        <p>{gameStateObjects.currentDeadline.toString()}</p>
      </div>
  )
})
export class HostPlayingScreen extends Component<HostPlayingScreenProps> {}
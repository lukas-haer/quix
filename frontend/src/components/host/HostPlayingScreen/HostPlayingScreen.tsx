import { Datex } from "datex-core-legacy/datex.ts";
import { ObjectRef } from "datex-core-legacy/runtime/pointers.ts";
import { GameStateObjects } from "../../../models/GameState.ts";

type HostPlayingScreenProps = {
	currentRound: Datex.Pointer<number>;
	gameStateObjects: ObjectRef<GameStateObjects>;
}

export default function HostPlayingScreen({currentRound, gameStateObjects}: HostPlayingScreenProps) {
  return (
      <div>
        <h2>Current Question:</h2>
        <p>{gameStateObjects.questions[currentRound.val].content.questionText}</p>
        <h2>Current Deadline:</h2>
        <p>{gameStateObjects.currentDeadline.toString()}</p>
      </div>
  )
}
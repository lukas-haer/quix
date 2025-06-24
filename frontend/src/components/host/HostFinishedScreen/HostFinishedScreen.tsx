import { Datex } from "datex-core-legacy/datex.ts";
import { Component, template } from "uix/components/Component.ts";
import {
  StateOptions,
} from "../../../models/GameState.ts";

@template(function ({state, currentRound} : {state: Datex.Pointer<StateOptions>, currentRound: Datex.Pointer<number>}) {
  return (
    <div>
      <h2>Game has finished.</h2>
	  <button onclick={() => {
		currentRound.val = 0;
		state.val = "waiting";
		}}>New Round</button>
    </div>
  );
})

//TODO: proper prop types instead of any
export class HostFinishedScreen extends Component<{state : Datex.Pointer, currentRound: Datex.Pointer}> {
}

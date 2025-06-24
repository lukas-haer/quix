import { Datex } from "datex-core-legacy/datex.ts";
import { Component, template } from "uix/components/Component.ts";
import {
  StateOptions,
} from "../../../models/GameState.ts";

@template(function () {
  return (
    <div>
      <h2>Game has finished.</h2>
	  <button onclick={() => {
		this.properties.currentRound.val = 0;
		this.properties.state.val = "waiting";
		}}>New Game</button>
    </div>
  );
})

//TODO: proper prop types instead of any
export class HostFinishedScreen extends Component<{state : Datex.Pointer<StateOptions> | any, currentRound: Datex.Pointer<number> | any}> {
}

import { Datex } from "datex-core-legacy/datex.ts";
import { Component, template } from "uix/components/Component.ts";
import {
  StateOptions,
} from "../../../../models/GameState.ts";

type HostFinishedScreenProps = {
    state: Datex.Pointer<StateOptions>;
    currentRound: Datex.Pointer<number>;
};

@template(function ({state, currentRound} : HostFinishedScreenProps) {
  return (
    <div>
      <h2>Game has finished.</h2>
	  <button type="button" onclick={() => {
		currentRound.val = 0;
		state.val = "waiting";
		}}>New Round</button>
    </div>
  );
})

export class HostFinishedScreen extends Component<{state : Datex.Pointer, currentRound: Datex.Pointer}> {
}

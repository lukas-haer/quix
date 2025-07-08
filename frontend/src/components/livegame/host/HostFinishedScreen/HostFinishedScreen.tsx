import { Datex } from "datex-core-legacy/datex.ts";
import { Component, template } from "uix/components/Component.ts";
import {
  StateOptions,
} from "../../../../models/GameState.ts";

type HostFinishedScreenProps = {
  state: Datex.Pointer<StateOptions>;
  currentRound: Datex.Pointer<number>;
};

@template(function ({ state, currentRound }: HostFinishedScreenProps) {
  return (
    <body>
      <h1>🏆 Final Standings</h1>
      <div class="podium">
        <div class="place second">
          <div class="name" id="secondName"></div>
          <div class="score" id="secondScore"></div>
        </div>
        <div class="place first">
          <div class="name" id="firstName"></div>
          <div class="score" id="firstScore"></div>
        </div>
        <div class="place third">
          <div class="name" id="thirdName"></div>
          <div class="score" id="thirdScore"></div>
        </div>
      </div>
      <button type="button" onclick={() => {
        currentRound.val = 0;
        state.val = "waiting";
      }}>New Round</button>
    </body>
  );
})

export class HostFinishedScreen extends Component<{ state: Datex.Pointer, currentRound: Datex.Pointer }> {
}

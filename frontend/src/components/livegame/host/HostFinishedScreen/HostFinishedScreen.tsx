import { Datex } from "datex-core-legacy/datex.ts";
import { Component, template } from "uix/components/Component.ts";
import { ObjectRef } from "datex-core-legacy/runtime/pointers.ts";
import { GameStateObjects } from "../../../../models/GameState.ts";

type HostFinishedScreenProps = {
  state: Datex.Pointer;
  currentRound: Datex.Pointer;
  gameStateObjects: ObjectRef<GameStateObjects>;
};

@template(function ({ state, currentRound, gameStateObjects }: HostFinishedScreenProps) {
  return (
    <div>
      <h2>Game has finished.</h2>
      <button
        type="button"
        onclick={() => {
          currentRound.val = 0;
          state.val = "waiting";
          while (gameStateObjects.players.length > 0) {
            gameStateObjects.players.pop();
          }
        }}
      >
        New Round
      </button>
    </div>
  );
})
export class HostFinishedScreen
  extends Component<
    {
      state: Datex.Pointer;
      currentRound: Datex.Pointer;
      gameStateObjects: ObjectRef<GameStateObjects>;
    }
  > {
}

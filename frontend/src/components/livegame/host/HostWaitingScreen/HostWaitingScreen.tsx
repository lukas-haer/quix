import { Datex } from "datex-core-legacy/datex.ts";
import { Component, template, style } from 'uix/components/Component.ts';
import { ObjectRef } from "datex-core-legacy/runtime/pointers.ts";
import {
  GameStateObjects,
  Player,
  StateOptions,
} from "frontend/src/models/GameState.ts";
import { registerLobby } from "backend/lobbyManagement/LobbyManagement.ts";
import { QrCode } from "frontend/src/components/utils/qrcode/qrcode.tsx";

type HostWaitingScreenProps = {
  state: Datex.Pointer<StateOptions>;
  currentRound: Datex.Pointer<number>;
  gameStateObjects: ObjectRef<GameStateObjects>;
};

@style("../HostMain.css") //TODO: replace and delete me
@template(async ({ state, currentRound, gameStateObjects }: HostWaitingScreenProps) => {
  const { prefix, name, instance } = Datex.Runtime.endpoint;

  const startGame = () => {
    state.val = "playing";
    updateDeadlineAndTimer();
  };

  const nextRound = () => {
    if (currentRound.val + 1 === gameStateObjects.questions.length) {
      state.val = "finished";
      return;
    }

    updateDeadlineAndTimer();
    currentRound.val++;
  };

  const updateDeadlineAndTimer = () => {
    // Can you do this more smoothly? an easy to understand one-liner perhaps?
    const newDeadline = new Date();
    newDeadline.setSeconds(
      newDeadline.getSeconds() +
        gameStateObjects.questions[currentRound.val].content.timeInSeconds,
    );
    gameStateObjects.currentDeadline = newDeadline;

    setTimeout(
      nextRound,
      gameStateObjects.currentDeadline.getTime() - Date.now(),
    );
  };

  let gamecode : string = "";
  try {
    //const lobby = await registerLobby(); //Registers a Lobby on the Backend
    gamecode = "123456"//lobby.code;    
  } catch (error) {
    console.error("An Error occured: " + error);
    alert("Unable to load gamecode"); //TODO Replace with snackbar
  }

 
  const invitelink = `${globalThis.location.origin}/join/${encodeURIComponent(gamecode)}` 

  return (
      <section class="row">
        <div class="col-6">
          <h2 style={styles.heading}>Waiting for players to join...</h2>
              <h2>Lobby:</h2>
                          <div>
                  {
                      //TODO: BUG: find out why array length property not reactive
                      gameStateObjects.players.map((player: Player) => (
                          <p>{player.name}</p>
                      ))
                  }
              </div>
        </div>
        <div class="col-6">
                                <QrCode url={invitelink}></QrCode>
              <InviteLink linkUrl={invitelink} />
              
              <button type="button" onclick={() => startGame()}>
                  Start Game
              </button>
        </div>
      </section>
  );
})
export class HostWaitingScreen extends Component<{ state: Datex.Pointer; currentRound: Datex.Pointer; gameStateObjects: ObjectRef<GameStateObjects> }> {}
//BUG?: Component has issues if we use typed Datex.Pointer Type (e.g. Datex.Pointer<StateOptions>)

function InviteLink({ linkUrl }: { linkUrl: string }) {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <p>{linkUrl}</p>
      <button
        type="button"
        onclick={() => navigator.clipboard.writeText(linkUrl)}
      >
        Copy
      </button>
      <br />
    </div>
  );
}

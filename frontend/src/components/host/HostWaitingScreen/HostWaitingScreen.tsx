import { Datex } from "datex-core-legacy/datex.ts";
import { ObjectRef } from "datex-core-legacy/runtime/pointers.ts";
import { Player, GameStateObjects, StateOptions } from "../../../models/GameState.ts";
import { styles } from "../HostDashboard/HostDashboardStyles.ts";
import { registerLobby } from "backend/lobbyManagement/LobbyManagement.tsx";

type HostWaitingScreenProps = {
	state: Datex.Pointer<StateOptions>;
	currentRound: Datex.Pointer<number>;
	gameStateObjects: ObjectRef<GameStateObjects>;
}

export default async function HostWaitingScreen({state, currentRound, gameStateObjects}: HostWaitingScreenProps) {
  const {prefix, name, instance} = Datex.Runtime.endpoint;

  const startGame = () => {
      state.val = "playing";
      updateDeadlineAndTimer()
    }

  const nextRound = () => {
      if (currentRound.val + 1 === gameStateObjects.questions.length){
          state.val = "finished";
          return
      }

      updateDeadlineAndTimer()
      currentRound.val++;
  }

  const updateDeadlineAndTimer = () => {
    // Can you do this more smoothly? an easy to understand one-liner perhaps?
    const newDeadline = new Date();
    newDeadline.setSeconds(newDeadline.getSeconds() + gameStateObjects.questions[currentRound.val].content.timeInSeconds);
    gameStateObjects.currentDeadline = newDeadline;

    setTimeout(nextRound, gameStateObjects.currentDeadline.getTime() - Date.now());
  }


  try {
      const lobby = await registerLobby() //Registers a Lobby on the Backend
      const gamecode = lobby.code

  return (
      <div>
        <h2 style={styles.heading}>Waiting for players to join...</h2>
        <h2>Lobby:</h2>
        {
        // BUG: Lobby disappears without empty html tags
        }
        <div>
        { //TODO: BUG: find out why array length property not reactive 
          gameStateObjects.players.map((player: Player) => <p>{player.name}</p>) 
          }
        </div>
        <button type="button" onclick={() => startGame()}>Start Game</button>
        <h2>Invite Links:</h2>
        <InviteLink linkUrl={"http://localhost/join/"+encodeURIComponent(gamecode)}/>
        
      </div>
  )
  } catch (error) {
    console.error("An Error occured: "+error);
    alert("Unable to load gamecode") //TODO Replace with snackbar
  }
}

function InviteLink({linkUrl}:{linkUrl: string}) {
  return (
    <div style={{display: "flex", gap: "10px"}}>
      <p>{ linkUrl }</p>
      <button type="button" onclick={() => navigator.clipboard.writeText(linkUrl)}>Copy</button>
      <br />

    </div>
    )
}
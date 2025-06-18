import { Datex } from "datex-core-legacy/datex.ts";
import { ObjectRef } from "datex-core-legacy/runtime/pointers.ts";
import { JoinGameReturn, GetCurrentQuestionReturn } from "../../../models/PlayerApiReturns.ts";
import { getHostIdFromGamecode } from "backend/lobbyManagement/LobbyManagement.tsx"
import GameScreen from "../GameScreen/GameScreen.tsx";


type JoinScreenProps = {
    id?:string;
};

const stateId = $("");
const currentRoundId = $("");


//TODO: can this be pulled from PlayerAPI class?
export type PlayerAPIType = {
  joinGame: (name: string) => JoinGameReturn;
  getCurrentQuestion: () => GetCurrentQuestionReturn;
  submitAnswer: (answerId: number) => number;
}

const apiObj: ObjectRef<{playerApi?: PlayerAPIType}> = $({}); //encapsulate api in ObjectRef to guarantee reactivity

export default function JoinScreen({id}:JoinScreenProps) {
  //TODO: error handling, user feedback (snackbar/form), form validation for endpoint format and username length

  const gamecode = $(id ? decodeURIComponent(id) : "");
  const name = $("");

  async function joinGameByGamecode (gamecode: string, username: string) {
      try {
          const gameCodeRegex = /^\d{6}$/; //Checks if gamecode consists of exactly 6 numbers

          if (!gameCodeRegex.test(gamecode)) {
            //TODO add snackbar
            return;
          }
          try {
            const endpointId = await getHostIdFromGamecode(gamecode);
            console.log("ENDPOINT: "+endpointId);
            
            joinGame(endpointId.toString(), username)

          } catch (error) {
            alert("Konnte game id nicht finden"+error)
          }


      } catch (error) {
          console.error("ERROR (joinGameByGamecode): " + error);
          //failureSnackbarMessage("Unable to Join","An error occured and it was not possible to join the game. Please try again later")
      }
  };

  const joinGame = async (endpointId: string, username: string) => {
    
    const api: PlayerAPIType = await datex.get(`${endpointId}.PlayerAPI`)
    if(!api) throw Error("Couldn't get Player API")

    const res: {state: Datex.Pointer<string>; currentRound: Datex.Pointer<number>;} = await api.joinGame(username)

    apiObj.playerApi = api

    currentRoundId.val = res.currentRound.id;
    stateId.val = res.state.id;
  }

  return (

    <div>
        {stateId.val !== "" ? <GameScreen stateId={stateId.val} currentRoundId={currentRoundId.val} apiObj={apiObj}/> : (
        <>
        <label>ID:</label>
        <input
          type="text"
          value={gamecode}
          placeholder="Endpoint ID eingeben"
          required
        />
        <label>Name:</label>
        <input
          type="text"
          value={name}
          placeholder="Name eingeben"
          required
        />
        <button type="button" onclick={() => joinGameByGamecode(gamecode.val, name.val)}>Join</button>
        </>
        )}

      </div>
  );
}
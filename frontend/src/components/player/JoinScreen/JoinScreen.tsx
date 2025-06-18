import { Datex } from "datex-core-legacy/datex.ts";
import { ObjectRef } from "datex-core-legacy/runtime/pointers.ts";
import { JoinGameReturn, GetCurrentQuestionReturn } from "../../../models/PlayerApiReturns.ts";
import { getHostIdFromGamecode } from "backend/lobbyManagement/LobbyManagement.tsx"
import GameScreen from "../GameScreen/GameScreen.tsx";
import { Component, template } from 'uix/components/Component.ts';

type JoinScreenProps = {
    id?:string;
};

const stateId = $("loading");
const currentRoundId = $("");


//TODO: can this be pulled from PlayerAPI class?
export type PlayerAPIType = {
  joinGame: (name: string) => JoinGameReturn;
  getCurrentQuestion: () => GetCurrentQuestionReturn;
  submitAnswer: (answerId: number) => number;
}

const apiObj: ObjectRef<{playerApi?: PlayerAPIType}> = $({}); //encapsulate api in ObjectRef to guarantee reactivity

@template<JoinScreenProps>(({id}) =>{
/* export default function JoinScreen({id}:JoinScreenProps) { */
  //TODO: error handling, user feedback (snackbar/form), form validation for endpoint format and username length

  //const gameId = $(id ? decodeURIComponent(id) : "");
  const gameId = $(decodeURIComponent(id ?? ""));
  const activeComponent = $("loading")
  const name = $("");

  async function getEndpointByGamecode(gamecode:string) {
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
          failureSnackbarMessage("Unable to Join","An error occured and it was not possible to join the game. Please try again later")
      }
  }

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
    activeComponent.val = "loading"

    const api: PlayerAPIType = await datex.get(`${endpointId}.PlayerAPI`)
    if(!api) throw Error("Couldn't get Player API")

    const res: {state: Datex.Pointer<string>; currentRound: Datex.Pointer<number>;} = await api.joinGame(username)

    apiObj.playerApi = api

    currentRoundId.val = res.currentRound.id;
    stateId.val = res.state.id;
  }

  const renderComponent = () => {
    switch (activeComponent.val) {
      case 'liveGame':
        return <div>Fehler noch nicht implementiert<GameScreen stateId={stateId.val} currentRoundId={currentRoundId.val} apiObj={apiObj} /></div>;
      case 'nameSelection':
        return <div>
          <h1>WHAT SHOULD WE CALL YOU?</h1>
        <div class="name-input-container">
            <input  type="text" 
                    class="name-input" 
                    id="nameInput" 
                    value={name}
                    maxlength="12" 
                    placeholder="Enter your name"
                    required />
            <div class="glowing-line" id="glowingLine"></div>
        </div>
        <button type="button" class="button" onclick={() => joinGameByGamecode(gameId.val, name.val)}>JOIN</button>
          
        </div>;
      case 'loading':
        return <div>Loading <button onclick={() => {activeComponent.val = "nameSelection"; console.log(activeComponent.val);}
        }>Wechsel</button></div>;
      default:
        return <div>Es ist ein Fehler aufgetreten.</div>;
    }

    
  };  

  return (
      <div class="section">
        <button onclick={() =>     console.log(activeComponent.val)}>log</button>
         {renderComponent()}
      </div>
  );
})
export default class JoinScreen extends Component<JoinScreenProps> {}
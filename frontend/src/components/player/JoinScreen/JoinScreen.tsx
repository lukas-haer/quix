import { Datex } from "datex-core-legacy/datex.ts";
import { ObjectRef } from "datex-core-legacy/runtime/pointers.ts";
import { JoinGameReturn, GetCurrentQuestionReturn } from "../../../models/PlayerApiReturns.ts";
import { getHostIdFromGamecode } from "backend/lobbyManagement/LobbyManagement.ts"
import GameScreen from "../GameScreen/GameScreen.tsx";
import { Component, template } from 'uix/components/Component.ts';
import { Snackbar, successSnackbarMessage, failureSnackbarMessage} from "frontend/src/components/utils/snackbar/Snackbar.tsx"

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

//TODO: error handling, user feedback (snackbar/form), form validation for endpoint format and username length
@template<JoinScreenProps>(({id}) =>{

  const gamecode = $(decodeURIComponent(id ?? ""));
  const endpointId = $("")
  const activeComponent = $("loading")
  const name = $("");

  async function getEndpointByGamecode() {
          try {
          const gameCodeRegex = /^\d{6}$/; //Checks if gamecode consists of exactly 6 numbers

            if(!gamecode.val || gamecode.val == "") {
              failureSnackbarMessage("No Gamecode provided", "Was unable to find Gamecode in queryparameter. Please try again.")
            }

          if (!gameCodeRegex.test(gamecode)) {
            failureSnackbarMessage("Error: Gamecode","The provided gamecode does not consist of 6 numbers.")
            return;
          }
          try {
            const recievedEndpointId = await getHostIdFromGamecode(gamecode);    
            console.log("ENDPOINT: "+recievedEndpointId);
            endpointId.val = recievedEndpointId.toString();
          } catch (error) {
            console.error("Error when attempting to find Lobby: "+error)
            failureSnackbarMessage("Lobby not found", "There is no lobby for this gamecode.")
          }

          successSnackbarMessage("Lobby joined","Joined Lobby successfully")
          activeComponent.val = "nameSelection";

      } catch (error) {
          console.error("ERROR (joinGameByGamecode): " + error);
          failureSnackbarMessage("Unable to Join","An error occured and it was not possible to join the game. Please try again later")
      }
  }
  getEndpointByGamecode()

  const joinGame = async () => {
    activeComponent.val = "loading"

    if (!gamecode || !gamecode.val || gamecode.val == "") {
      return;
    }

    const api: PlayerAPIType = await datex.get(`${endpointId.val}.PlayerAPI`)
    if(!api) throw Error("Couldn't get Player API")

    const res: {state: Datex.Pointer<string>; currentRound: Datex.Pointer<number>;} = await api.joinGame(name.val)

    apiObj.playerApi = api

    currentRoundId.val = res.currentRound.id;
    activeComponent.val = "liveGame";
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
        <button type="button" class="button" onclick={() => joinGame()}>JOIN</button>
          
        </div>;
      case 'loading':
        return <div>Loading <button onclick={() => {activeComponent.val = "nameSelection"; console.log(activeComponent.val);}
        }>Wechsel</button></div>;
      default:
        return <div>Es ist ein Fehler aufgetreten.</div>;
    }

    
  };  

  return (
      <main class="section">
         {renderComponent()}
        <Snackbar/>
      </main>
  );
})
export default class JoinScreen extends Component<JoinScreenProps> {}
import { Datex } from "datex-core-legacy/datex.ts";
import { ObjectRef } from "datex-core-legacy/runtime/pointers.ts";
import { sampleQuestions, SingleChoiceQuestion, MultipleChoiceQuestion } from "../../../models/Question.ts";
import { Player, GameStateObjects, StateOptions } from "../../../models/GameState.ts";
import { JoinGameReturn, GetCurrentQuestionReturn } from "../../../models/PlayerApiReturns.ts";
import { HostWaitingScreen } from "./HostWaitingScreen/HostWaitingScreen.tsx";
import { HostPlayingScreen } from "./HostPlayingScreen/HostPlayingScreen.tsx";
import { Component, template } from "uix/components/Component.ts";
import { Snackbar } from "frontend/src/components/utils/snackbar/Snackbar.tsx";

//TODO: Does it make any difference having the pointers and api outside vs inside of a component?
//TODO: pause/reset timeout

//TODO: Do we want these as eternal variables? -> If yes, how do we handle recovery of the next question timer and api calls while host is offline.
const state: Datex.Pointer<StateOptions> = $("waiting");
const currentRound: Datex.Pointer<number> = $(0);

//This ObjectRef encapsules all the gamestate variables, that are some kind of object type. This is necessary to guarantee reactivity.
const gameStateObjects: ObjectRef<GameStateObjects> = $({
  currentDeadline: new Date(),
  questions: sampleQuestions,
  players: []
})

grantPublicAccess(state);
grantPublicAccess(currentRound);

//TODO: can we move the api class out of here?
@endpoint
class PlayerAPI {
  //Returns pointers to state and currentRound for the player to listen on.
  @property static joinGame(name: string): JoinGameReturn {
    if (state.val !== "waiting") throw new Error("Cannot register users for a game that has already started.")
    const registeredPlayerNames = gameStateObjects.players.map((player: Player) => player.name)
    if (registeredPlayerNames.includes(name)) throw new Error("Username already taken.")
    //TODO: check endpoint id
    const newPlayer = { name, endpointId: datex.meta?.caller, points: 0 }
    gameStateObjects.players.push(newPlayer);
    return { state, currentRound }
  }

  @property static submitAnswer(answer: any): number {
    if(state.val !== "playing") throw new Error("Game has not started yet.")

    //TODO: change players object to dict? This would facilitate callerId, username check etc. (keys = player endpoint ids)
    const callerId = datex.meta?.caller
    const playerIndex = gameStateObjects.players.findIndex((player: Player) => player.endpointId === callerId)
    
    if(playerIndex === -1) throw new Error("There is no player with that endpoint id.")
    //TODO: cache answers and evaluate at the end of a round
    const currentQuestion = gameStateObjects.questions[currentRound.val]
    if(!currentQuestion.isCorrect(answer)) throw new Error("Wrong answer.")

    gameStateObjects.players[playerIndex].points = gameStateObjects.players[playerIndex].points + 1
    return gameStateObjects.players[playerIndex].points
  }

  @property static getCurrentQuestion(): GetCurrentQuestionReturn {
    if (state.val !== "playing") throw new Error("Game has not started yet.")
    const { questionText, answers } = gameStateObjects.questions[currentRound.val].content
    return { questionText, answers, currentDeadline: gameStateObjects.currentDeadline }
  }

  @property static getPlayers() {
    return gameStateObjects.players;
  }

  @property static version = "0.0.1";
}

(globalThis as any).PlayerAPI = PlayerAPI;
//(globalThis as any).gameStateObjects = gameStateObjects;

@template(() => {

  //TODO: intermediary screen that detects if host already has a game running and asks if the host wishes to create a new game or view the old one.
  const resetGame = () => {
    //TODO: This is broken.
    //TODO: resetting the pointer values multiple times breaks the page (with currentRound it breaks immediately)
    state.val = "waiting"
    currentRound.val = 0

    gameStateObjects.players.splice(0)
    //gameStateObjects.currentDeadline = new Date()
    gameStateObjects.questions = sampleQuestions
  }

  return (
    <div class="container">
      <Snackbar></Snackbar>
        {
          state.val === "waiting" && <HostWaitingScreen state={state} currentRound={currentRound} gameStateObjects={gameStateObjects} />
        }
        {
          state.val === "playing" && <HostPlayingScreen currentRound={currentRound.val} gameStateObjects={gameStateObjects} />
        }
        {
          state.val === "finished" && <h2>Game has finished.</h2>
        }
    </div>
    )
})
export class HostMain extends Component {}

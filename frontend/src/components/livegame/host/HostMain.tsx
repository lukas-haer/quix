import { Datex } from "datex-core-legacy/datex.ts";
import { ObjectRef } from "datex-core-legacy/runtime/pointers.ts";
import { sampleQuestions } from "common/models/Question.ts";
import { Player, GameStateObjects, StateOptions } from "../../../models/GameState.ts";
import { JoinGameReturn, GetCurrentQuestionReturn } from "../../../models/PlayerApiReturns.ts";
import { HostWaitingScreen } from "./HostWaitingScreen/HostWaitingScreen.tsx";
import { HostPlayingScreen } from "./HostPlayingScreen/HostPlayingScreen.tsx";
import { HostFinishedScreen } from "./HostFinishedScreen/HostFinishedScreen.tsx";
import { Component, template } from "uix/components/Component.ts";
import { Snackbar } from "frontend/src/components/utils/snackbar/Snackbar.tsx";
import {HostSolutionScreen} from "./HostSolutionScreen/HostSolutionScreen.tsx";
import { QuizImport } from "frontend/src/components/livegame/host/QuizImport/QuizImport.tsx";


  //TODO: Does it make any difference having the pointers and api outside vs inside of a component?
  //TODO: pause/reset timeout

  

  //TODO: Do we want these as eternal variables? -> If yes, how do we handle recovery of the next question timer and api calls while host is offline.
  const state: Datex.Pointer<StateOptions> = $("waiting");
  const currentRound: Datex.Pointer<number> = $(0);

  //This ObjectRef encapsules all the gamestate variables, that are some kind of object type. This is necessary to guarantee reactivity.
  const gameStateObjects: ObjectRef<GameStateObjects> = $({
    currentDeadline: new Date(),
    questions: sampleQuestions, //TODO hier stattdessen aktuelles user quiz oder importiertes Quiz
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
      if(state.val !== "question") throw new Error("Game has not started yet.")

      //TODO: change players object to dict? This would facilitate callerId, username check etc. (keys = player endpoint ids)
      const callerId = datex.meta?.caller
      const playerIndex = gameStateObjects.players.findIndex((player: Player) => player.endpointId === callerId)
      
      if(playerIndex === -1) throw new Error("There is no player with that endpoint id.")
      //TODO: cache answers and evaluate at the end of a round
      const currentQuestion = gameStateObjects.questions[currentRound.val]

      if(!currentQuestion.isCorrect(answer)) throw new Error("Wrong answer.");


      
      const { currentDeadline } = PlayerAPI.getCurrentQuestion();

      const currentPlayer = gameStateObjects.players[playerIndex];
      currentPlayer.points = currentPlayer.points + this.calcPoints(Date.now(), currentDeadline.getTime());
      return currentPlayer.points;
    }

    @property static getCurrentQuestion(): GetCurrentQuestionReturn {
      if (state.val !== "question") throw new Error("Game has not started yet.")
      const { questionText, answers } = gameStateObjects.questions[currentRound.val].content
      return { questionText, answers, currentDeadline: gameStateObjects.currentDeadline }
    }

    @property static getPlayers() {
      return gameStateObjects.players;
    }

    @property static calcPoints (timeOfSubmit : number, questionDeadline : number) : number {

      const maxTimeToAnswer = gameStateObjects.questions[currentRound.val].content.timeInSeconds * 1000; //in ms
      const timeLeft = questionDeadline - timeOfSubmit; 
      const timePast = maxTimeToAnswer - timeLeft;
      
      const maxPoints = 100;
      const speedBonus = Math.pow(timeLeft / maxTimeToAnswer, 2);
      const points = Math.round(maxPoints * (0.5 * speedBonus + 0.5));

      if (timePast < 500) { //no reward for spamming the submit the button
        return 0;
      } else {
        return points;
      }
    }


  @property static getScoreboard(): { name: string; points: number }[] {
    return [] //TODO Remove
    if (state.val == "waiting") throw new Error("Cannot get scoreboard before the game started.");
    if (state.val == "question") throw new Error("Cannot get scoreboard during question phase.");
    const scorebaord = gameStateObjects.players.map((player: Player) => ({ name: player.name, points: player.points }));
    return scorebaord
  }

    @property static whoAmI(): string {
      const callerId = datex.meta?.caller
      const playerIndex = gameStateObjects.players.findIndex((player: Player) => player.endpointId === callerId)

      if(playerIndex === -1) throw new Error("There is no player with that endpoint id.")

      return gameStateObjects.players[playerIndex].name
    }

    @property static version = "0.0.1";
    }

    (globalThis as any).PlayerAPI = PlayerAPI;
    //(globalThis as any).gameStateObjects = gameStateObjects;

  @template(() => {
 

    //TODO: intermediary screen that detects if host already has a game running and asks if the host wishes to create a new game or view the old one.

    const resetGame = () => {
      console.log("Resettet game");
      
        currentRound.val = 0;
        state.val = "waiting";
      
    }

    function getScoreboard(): { name: string; points: number }[] {
      if (state.val == "waiting") throw new Error("Cannot get scoreboard before the game started.");
      if (state.val == "question") throw new Error("Cannot get scoreboard during question phase.");
      const scoreboard = gameStateObjects.players.map((player: Player) => ({ name: player.name, points: player.points }));
      return scoreboard
    }

    let questionTimeoutID: number | undefined = undefined

    const updateQuestionDeadlineAndTimer = () => {
      const seconds = gameStateObjects.questions[currentRound.val].content.timeInSeconds;   
      console.log("cr: ",currentRound.val);
      console.log("questions",gameStateObjects.questions);
      console.log("questionscontent",gameStateObjects.questions[currentRound.val].content);
      
      console.log("SECONDS: ",gameStateObjects.questions[currentRound.val].content);
         
      gameStateObjects.currentDeadline  = new Date(Date.now() + seconds * 1000);
      questionTimeoutID = setTimeout(showSolutions, seconds * 1000,);
    };

    function startGame():void {
      currentRound.val = 0
      state.val = "question";
      updateQuestionDeadlineAndTimer();
    }

    function showSolutions():void {
      clearTimeout(questionTimeoutID);
      state.val = "solution"
    }

    function nextQuestion () {
      if (currentRound.val + 1 === gameStateObjects.questions.length) {
        state.val = "finished";
        return;
      }
      currentRound.val++;
      updateQuestionDeadlineAndTimer();
      state.val = "question"
    };



    return (
      <div class="container">
        <Snackbar />
          {
            state.val === "setup" && (
              <div>
                <QuizImport gameStateObjects={gameStateObjects} />
                <button type="button" onclick={() => { state.val = "waiting" }}> Start Lobby </button> 
              </div>
            )  //TODO Move to component
          }
          {
            state.val === "waiting" && <HostWaitingScreen state={state} gameStateObjects={gameStateObjects} startGame={startGame}/>
          }
          {
            state.val === "question" && <HostPlayingScreen showSolutions={showSolutions} currentRound={currentRound.val} gameStateObjects={gameStateObjects} />
          }
          {
            state.val === "solution" && <HostSolutionScreen nextQuestion={nextQuestion} getScoreboard={getScoreboard} state={state} currentRound={currentRound.val} gameStateObjects={gameStateObjects}/>
          }
          {
            state.val === "finished" && <HostFinishedScreen resetGame={resetGame} />
          }
      </div>
      )
  })
  export class HostMain extends Component {}


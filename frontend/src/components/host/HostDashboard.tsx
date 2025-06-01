import { Datex } from "datex-core-legacy/datex.ts";
import { ObjectRef } from "datex-core-legacy/runtime/pointers.ts";

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center' as const,
        fontFamily: 'sans-serif',
    },
    heading: {
        fontSize: '2rem',
        marginBottom: '10px',
    },
    text: {
        fontSize: '1.2rem',
    },
};

//TODO: move types (and endpoint logic?) out of here
type Player = {name: string; endpointId: Datex.Endpoint; points: number;}

type QuestionWithoutAnswer = {question: string; answers: string[]; timeInSeconds: number;}
type Question = QuestionWithoutAnswer & {correctAnswerId: number;}

type GetCurrentQuestionReturn = {question: string; answers: string[]; currentDeadline: Date;}

type StateOptions = "waiting" | "playing" | "finished" | "aborted";

type GameState = {
    state: Ref<StateOptions>;
    currentRound: Ref<number>;
    currentDeadline: Date;
    questions: Question[];
    players: Player[];
}

type UserGameState = {
  state: Datex.Pointer<StateOptions>;
  currentRound: Datex.Pointer<number>;
}

const testQuestions = [{question: "abcd?", answers: ["a","b","c","d"], correctAnswerId: 0, timeInSeconds: 30},{question: "abcd?", answers: ["a","b","c","d"], correctAnswerId: 2, timeInSeconds: 30}]

//TODO: this is supposed to be the gameState object
//TODO: BUG?: how to save pointer to object and how to get reference to that pointer from object
const state: Datex.Pointer<StateOptions> = $("waiting");
const currentRound: Datex.Pointer<number> = $(0);
// let currentDeadline: ObjectRef<Date> = $(new Date());
// let questions: ObjectRef<Question[]> = $(testQuestions);
// let players: ObjectRef<Player[]> = $([]);

type TestState = {
  currentDeadline: Date;
  questions: Question[];
  players: Player[];
}

const test: ObjectRef<TestState> = $({
  currentDeadline: new Date(),
  questions: testQuestions,
  players: []
})

grantPublicAccess(state);
grantPublicAccess(currentRound);

//TODO: make gameState eternal?

// const gameState = $({
//     state: state, //make this public so players can listen on gamestate
//     currentRound: $(0), // maybe users can listen for this too? -> and refetch question
//     currentDeadline: new Date(),
//     questions: testQuestions,
//     players: []
// })

const resetGame = () => {
  //TODO: resetting the pointer values multiple times breaks the page (with currentRound it breaks immediately)
  state.val = "waiting"
  //currentRound.val = 0

  //TODO: How to set value of Object Pointers???
  test.currentDeadline = new Date()
  test.questions = testQuestions
}

const startGame = () => {
    state.val = "playing"
}

const nextRound = () => {
    if (currentRound.val + 1 === test.questions.length){
        state.val = "finished"
        return
    }
    // Can you do this more smoothely?
    const newDeadline = new Date();
    newDeadline.setSeconds(newDeadline.getSeconds() + test.questions[currentRound.val].timeInSeconds);
    test.currentDeadline = newDeadline;
    //test.currentDeadline = new Date(new Date() + test.questions[currentRound.val].timeInSeconds * 1000)
    currentRound.val++;
}

//Callable on host via e.g. 'PlayerAPI.joinGame("test")'
//The player would need to use: 'await datex`{hostID}.PlayerAPI.joinGame("test")`'
@endpoint
class PlayerAPI {
  //Returns pointers to state and currentRound for the player to listen on.
  @property static joinGame(name: string): UserGameState {
    console.log(state.val)
    if (state.val !== "waiting") throw new Error("Cannot register users for a game that has already started.")
    const newPlayer = { name, endpointId: datex.meta?.caller, points: 0 }
    test.players.push(newPlayer);
    //return { state: state, currentRound: currentRound };
    //const { state, currentRound } = gameState
    return { state, currentRound }
  }

  @property static submitAnswer(answerId: number) {
    //TODO
    return
  }

  @property static getCurrentQuestion(): GetCurrentQuestionReturn {
    if (state.val !== "playing") throw new Error("Game has not started yet.")
    //const currentQuestion = questions[currentRound]
    //return {question: currentQuestion.question, answers: currentQuestion.answers, currentDeadline: currentDeadline};
    const { question, answers } = test.questions[currentRound.val]
    return { question, answers, currentDeadline: test.currentDeadline }
  }

  @property static getPlayers() {
    return test.players;
  }

  @property static version = "0.0.1";
}

//for testing purposes
(globalThis as any).PlayerAPI = PlayerAPI;
//(globalThis as any).gameState = gameState;
//(globalThis as any).players = players;
//(globalThis as any).testState = testState;
(globalThis as any).test = test;

export default function HostDashboard() {
    return (
      <div style={styles.container}>
          {
            state.val === "waiting" && <div>
              <h2 style={styles.heading}>Waiting for players to join...</h2>
              <h2>Lobby:</h2>
              {
              // BUG: Lobby disappears without empty html tags
              }
              <>
              { //TODO: BUG: find out why array length property not reactive 
                test.players.map((player: Player) => <div>{player.name}</div>) 
                }
              </>
              <button onclick={() => startGame()}>Start Game</button>
            </div>
          }
          <button onclick={() => resetGame()}>Reset Game</button>
      </div>
      )
}

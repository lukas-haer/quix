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

const testQuestions = [{question: "Frage 1: abcd?", answers: ["a","b","c","d"], correctAnswerId: 0, timeInSeconds: 5},{question: "Frage 2: abcd?", answers: ["a","b","c","d"], correctAnswerId: 2, timeInSeconds: 5}]

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
  players: ObjectRef<Player[]>;
}

const test: ObjectRef<TestState> = $({
  currentDeadline: new Date(),
  questions: testQuestions,
  players: $([]) //why does this not work without a pointer??? didn't it used to work?? why does it crash???? why does it not work in eternal mode/?????
})

grantPublicAccess(state);
grantPublicAccess(currentRound);
grantPublicAccess(test.players); // TODO: how can i remove this and have it still working??

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
  currentRound.val = 0

  //TODO: How to set value of Object Pointers???
  //test.players = []
  test.currentDeadline = new Date()
  test.questions = testQuestions
}

const startGame = () => {
    state.val = "playing";
    updateDeadlineAndTimer()
  }

const nextRound = () => {
    if (currentRound.val + 1 === test.questions.length){
        state.val = "finished";
        return
    }

    updateDeadlineAndTimer()
    currentRound.val++;
}

const updateDeadlineAndTimer = () => {
  // Can you do this more smoothely?
  const newDeadline = new Date();
  newDeadline.setSeconds(newDeadline.getSeconds() + test.questions[currentRound.val].timeInSeconds);
  test.currentDeadline = newDeadline;
  //test.currentDeadline = new Date(new Date() + test.questions[currentRound.val].timeInSeconds * 1000)

  setTimeout(nextRound, test.currentDeadline.getTime() - Date.now());
}

//Callable on host via e.g. 'PlayerAPI.joinGame("test")'
//The player would need to use: 'await datex`{hostID}.PlayerAPI.joinGame("test")`'
@endpoint
class PlayerAPI {
  //Returns pointers to state and currentRound for the player to listen on.
  @property static joinGame(name: string): UserGameState {
    console.log(state.val)
    if (state.val !== "waiting") throw new Error("Cannot register users for a game that has already started.")
    const registeredPlayerNames = test.players.map(player => player.name)
    if (registeredPlayerNames.includes(name)) throw new Error("Username already taken.")
    const newPlayer = { name, endpointId: datex.meta?.caller, points: 0 }
    test.players.push(newPlayer);
    //return { state: state, currentRound: currentRound };
    //const { state, currentRound } = gameState
    return { state, currentRound }
  }

  @property static submitAnswer(answerId: number): number {
    if(state.val !== "playing") throw new Error("Game has not started yet.")

    //TODO: check if caller in players array -> switch to dict (keys = player endpoint ids)
    const callerId = datex.meta?.caller
    const playerIndex = test.players.findIndex((player: Player) => player.endpointId === callerId)
    
    if(playerIndex === -1) throw new Error("There is no player with that endpoint id.")
    //TODO: cache answers and evaluate at the end of a round
    if(answerId !== test.questions[currentRound.val].correctAnswerId) throw new Error("Wrong answer.")

    test.players[playerIndex].points = test.players[playerIndex].points + 1
    return test.players[playerIndex].points
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
            state.val === "waiting" && <HostWaitingView />
          }
          {
            state.val === "playing" && <HostPlayingView />
          }
          {
            state.val === "finished" && <h2>Game has finished.</h2>
          }
          <button onclick={() => resetGame()}>Reset Game</button>
      </div>
      )
}

function HostWaitingView() {
  const {prefix, name, instance} = Datex.Runtime.endpoint;
  const hostEndpointId = prefix + name + "/" + instance;
  const appUrls = Datex.Unyt.endpointDomains();

  return (
      <div>
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
        <h2>Invite Links:</h2>
        <>
        {
          appUrls?.map(url => <InviteLink linkUrl={url + "/join/" + encodeURIComponent(hostEndpointId)} /> )
        }
        </>
      </div>
  )
}

function InviteLink({linkUrl}:{linkUrl: string}) {
  return (
    <div style={{display: "flex", gap: "10px"}}>
      <p>{ linkUrl }</p>
      <button onclick={() => navigator.clipboard.writeText(linkUrl)}>Copy</button>
    </div>
    )
}

function HostPlayingView() {
  return (
      <div>
        <h2>Current Question:</h2>
        <p>{test.questions[currentRound.val].question}</p>
        <h2>Current Deadline:</h2>
        <p>{test.currentDeadline.toString()}</p>
      </div>
  )
}

import { Datex } from "datex-core-legacy/datex.ts";
import { ObjectRef } from "datex-core-legacy/runtime/pointers.ts";

type JoinScreenProps = {
    handleJoin:(name:string, id:string) => void;
    id?:string;
};

const stateId = $("");
const currentRoundId = $("");


//get api from endpoint
const joinGame = async (endpointId: string, username: string) => {
  console.log(endpointId)
  console.log(username)
  //console.log(`await datex`${endpointId}.PlayerAPI.joinGame(${username})``)
  //const res = await datex`${endpointId}.PlayerAPI.joinGame(${username})`
  if(!apiObj.playerApi) throw Error("Please fetch the hosts PlayerAPI first.")
  const res: {state: Datex.Pointer<string>; currentRound: Datex.Pointer<number>;} = await apiObj.playerApi.joinGame(username)

  console.log(res)
  console.log(res.state.id)
  console.log(res.currentRound.id)
  currentRoundId.val = res.currentRound.id;
  stateId.val = res.state.id;
  //statePointer.val = res.state;
  //currentRound = res.currentRound;
}

// const getApi = async (endpointId: string) => {

// }

//TODO: can this be pulled from PlayerAPI class?
type PlayerAPIType = {
  joinGame: (name: string) => {state: Datex.Pointer<string>; currentRound: Datex.Pointer<number>};
  getCurrentQuestion: () => {question: string; answers: string[], currentDeadline: Date;}
}

const apiObj: ObjectRef<{playerApi?: PlayerAPIType}> = $({});
//const playerApi = $({})

(globalThis as any).stateId = stateId;

export default function JoinScreen({handleJoin, id}:JoinScreenProps) {

  const gameId = $(id ? decodeURIComponent(id) : "");
  const name = $("");

    return (
      <div>
          <label>ID:</label>
          <input
            type="text"
            value={gameId.val}
            onchange={(e:any) => gameId.val = e.target.value}
            placeholder="Endpoint ID eingeben"
          />
          <button onclick={async () => {
            const api: PlayerAPIType = await datex.get(`${gameId.val}.PlayerAPI`)
            const hostState = await datex.get(`${gameId.val}.state`)
            const hostCurrentRound = await datex.get(`${gameId.val}.currentRound`)
            console.log(hostState)
            console.log(hostCurrentRound)
            if(!api) throw Error("Couldn't get Player API")
            apiObj.playerApi = api
            console.log(apiObj.playerApi ?? "")
          }
          }>Get API</button>
          <label>Name:</label>
          <input
            type="text"
            value={name.val}
            onchange={(e:any) => name.val = e.target.value}
            placeholder="Name eingeben"
          />
          <button onclick={() => joinGame(gameId.val, name.val)}>Join</button>
          {
            stateId.val !== "" && <Game />
          }
      </div>
    );
}

async function Game() {
  const state: Datex.Pointer<string> = await datex.get(`$${stateId}`)
  const currentRound: Datex.Pointer<number> = await datex.get(`$${currentRoundId}`)

  const submittedAnswer: Datex.Pointer<boolean> = $(false); 

  //TODO: We can just grab the pointer references instead of manually calling the endpoint.
  const question: Datex.Pointer<string> = $("");
  const answers: Datex.Pointer<string> = $("");
  const currentDeadline: Datex.Pointer<string> = $("");

  async function updateQuestionAndAnswers(){
    if(!apiObj.playerApi) throw Error("PlayerAPI not defined.")
    const res: {question: string; answers: string[]; currentDeadline: Date;} = await apiObj.playerApi.getCurrentQuestion();
    console.log(res);

    question.val = res.question;
    answers.val = res.answers.join(";"); //To avoid using ObjectRef
    currentDeadline.val = res.currentDeadline.toLocaleString(); //To avoid using ObjectRef

    submittedAnswer.val = false;
  }

  state.observe((v) => {
    v === "playing" ? updateQuestionAndAnswers() : console.log("Wrong state.")
  })
  currentRound.observe(() => { updateQuestionAndAnswers() })

  return (
    <div>
      <h2>State: {state.val}</h2>
      <h2>Round: {currentRound.val}</h2>
      {
        state.val === "waiting" && <h2>Waiting for Host to start the game.</h2>
      }
      {
        state.val === "playing" && (
          <div>
            { !submittedAnswer.val ? (
              <>
              <h2>{question.val}</h2>
              <div style={{display: "flex", gap: "10px"}}>
              {answers.val.split(";").map((answer, index) => <button style={{padding: "50px"}} onclick={() => {
                //TODO: call submitAnswer with index
                submittedAnswer.val = true;
                }}>{answer}</button>)}
              </div>
              <h2>Deadline: {currentDeadline}</h2>
              </>
            )
              : <h2>Waiting for next Question.</h2>
            }
          </div>
        )
      }
      {
        state.val === "finished" && <h2>The game has finished.</h2>
      }
    </div>
  )
}
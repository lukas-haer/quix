import { type Entrypoint } from "uix/providers/entrypoints.ts";
import { CreateQuiz } from './src/components/gamecreation/createQuiz/CreateQuiz.tsx';
import { getLobbys, registerLobby, getHostIdFromGamecode } from "../backend/lobbyManagement/LobbyManagement.tsx"

const gamecode = $("");

export default <div>
	"Hello, UIX!"
	<CreateQuiz/>
	<button onclick={() => {registerLobby()}}>register lobby</button>
	<button onclick={() => {console.log( getLobbys())}}>log lobby</button>

	<input type="text" value={gamecode}/>
	<button onclick={() => {console.log( getHostIdFromGamecode( gamecode.val))}}>log lobby</button>

	

</div> satisfies Entrypoint;

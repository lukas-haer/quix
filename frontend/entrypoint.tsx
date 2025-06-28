import { type Entrypoint } from "uix/providers/entrypoints.ts";
import { CreateQuiz } from './src/components/gamecreation/createQuiz/CreateQuiz.tsx';
import { PlayQuiz } from './src/components/player/PlayQuiz.tsx';


export default <div>
	"Hello, UIX!"
	<PlayQuiz/>
</div> satisfies Entrypoint;

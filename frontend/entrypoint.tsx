import { type Entrypoint } from "uix/providers/entrypoints.ts";
import { CreateQuiz } from './components/gamemaster/createQuiz/CreateQuiz.tsx';


export default <div>
	"Hello, UIX!"
	<CreateQuiz/>
</div> satisfies Entrypoint;

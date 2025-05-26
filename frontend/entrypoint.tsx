import { type Entrypoint } from "uix/providers/entrypoints.ts";
import { CreateQuiz } from './src/components/gamecreation/createQuiz/CreateQuiz.tsx';


export default <div>
	"Hello, UIX!"
	<CreateQuiz/>
</div> satisfies Entrypoint;

import {Datex} from "datex-core-legacy/datex.ts";
import {Component, template} from "uix/components/Component.ts";
import {ObjectRef} from "datex-core-legacy/runtime/pointers.ts";
import {SingleChoiceQuestion} from "../../../../../../../common/models/Question.ts";
import {GameStateObjects} from "../../../../../models/GameState.ts";


type SingleChoiceQuestionComponentProps = {
    currentRound: Datex.Pointer;
    gameStateObjects: ObjectRef<GameStateObjects>;
};

@template(
    async function ({currentRound, gameStateObjects}: SingleChoiceQuestionComponentProps) {

        function getCurrentQuestion() {
            return gameStateObjects.questions[currentRound.val];
        }

        const question = getCurrentQuestion() as SingleChoiceQuestion;
        const questionText = question.content.questionText
        const answers = question.content.answers
        const correctAnswer = question.content.correctAnswerId

        return (
            <div>
                <h1>{questionText}</h1>
                <div class="answer-container">
                    {answers.map((text, index) => (
                        <div class={`answer ${index === correctAnswer ? 'correct' : 'incorrect'}`}>
                            {text}
                        </div>

                    ))}
                </div>
            </div>
        );
    },
)
export class SingleChoiceQuestionSolution extends Component<SingleChoiceQuestionComponentProps> {
}

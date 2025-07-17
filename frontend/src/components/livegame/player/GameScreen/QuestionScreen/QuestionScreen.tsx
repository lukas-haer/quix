import { Datex } from 'datex-core-legacy/datex.ts';
import { Component, template } from 'uix/components/Component.ts';
import { LoadingScreen } from 'frontend/src/components/utils/loadingscreen/LoadingScreen.tsx';

type DefaultQuestionScreenProps = {
    questionText: string;
    answers: string;
    currentDeadline: number;
    submitAnswer: (answerIndex: number) => void;
};

type FunctionQuestionScreenProps = DefaultQuestionScreenProps & { submittedAnswer: Datex.Pointer<boolean> };
type ComponentQuestionScreenProps = DefaultQuestionScreenProps & { submittedAnswer: Datex.Pointer };

@template(({ questionText, answers, currentDeadline, submittedAnswer, submitAnswer }: FunctionQuestionScreenProps) => {
    function handleAnswerClick(answerId: number) {
        //TODO: error handling
        submitAnswer(answerId);
        submittedAnswer.val = true;
    }

    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setViewportHeight();

    globalThis.addEventListener('resize' , setViewportHeight)

    return (
        <main>
            {!submittedAnswer.val ? (
                <section class="section">
                    <div class="host-bg-shape-main"></div>
                    <div class="host-bg-shape-circle"></div>
                    <div class="top flex-center">
                        <div class="question-title-container ">
                            <h1>{questionText}</h1>
                        </div>
                    </div>
                    <div class="bottom flex-center">
                        <div class="button-container">
                            {answers.split(';').map((_, index: number) => (
                                <AnswerButton answerId={index} handleSubmit={() => handleAnswerClick(index)} />
                            ))}
                        </div>
                    </div>
                    <div
                        class="countdown-bar"
                        id="countdownBar"
                        style={`animation: countdown ${Math.floor(currentDeadline - Date.now()) / 1000}s linear forwards`}
                    ></div>
                </section>
            ) : (
                <main>
                    <LoadingScreen text="Lets see if you were right..." subtext="Please wait for the others to answer" />
                </main>
            )}
        </main>
    );
})
export class QuestionScreen extends Component<ComponentQuestionScreenProps> {}

type AnswerButtonProps = {
    answerId: number;
    handleSubmit: () => void;
};

@template(({ answerId, handleSubmit }: AnswerButtonProps) => {
    return (
        <button type="button" class={`answer-button button${answerId}`} onclick={handleSubmit}>
            <span class={`icon icon${answerId}`} />
        </button>
    );
})
export class AnswerButton extends Component<AnswerButtonProps> {}

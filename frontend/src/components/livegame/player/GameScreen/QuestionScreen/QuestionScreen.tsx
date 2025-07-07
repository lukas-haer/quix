import { Datex } from "datex-core-legacy/datex.ts";
import { Component, template } from "uix/components/Component.ts";
import { LoadingScreen } from "frontend/src/components/utils/loadingscreen/LoadingScreen.tsx";

type DefaultQuestionScreenProps = {
    questionText: string;
    answers: string;
    currentDeadline: number;
    submitAnswer: (answerIndex: number) => void;
};

type FunctionQuestionScreenProps = DefaultQuestionScreenProps & { submittedAnswer: Datex.Pointer<boolean>; }
type ComponentQuestionScreenProps = DefaultQuestionScreenProps & { submittedAnswer: Datex.Pointer; }

@template( ({ questionText, answers, currentDeadline, submittedAnswer, submitAnswer }: FunctionQuestionScreenProps) => {

  function handleAnswerClick(answerId: number) {
    //TODO: error handling
    submitAnswer(answerId);
    submittedAnswer.val = true;
  }

  console.log("CD: ",currentDeadline);
  

  return (
    <main>
      { !submittedAnswer.val ? (
                 <section class="section">
        <h1>{questionText}</h1>
        <div class="button-container">
          {
            answers.split(";").map( (answer: string, index: number) => <AnswerButton answerText={answer} answerId={index} handleSubmit={() => handleAnswerClick(index)}/>)
          }
        </div>
        <div class="countdown-bar" id="countdownBar" style={`animation: countdown ${Math.floor(currentDeadline - Date.now()) / 1000}s linear forwards`}>
</div>
</section>

        ) : (
          <main>
            <LoadingScreen text="Lets see if you were right..." subtext="Please wait for the others to answer"/>
          </main>
        )

        
}

 
    </main>
  );
})
export class QuestionScreen extends Component<ComponentQuestionScreenProps> {}

type AnswerButtonProps = {
  answerText: string;
  answerId: number;
  handleSubmit: () => void;
}

@template(({answerText, answerId, handleSubmit}: AnswerButtonProps) => {
  return(
    <button 
    type="button"
      class={`button button${answerId}`}
      onclick={handleSubmit}>
      <span class={`icon icon${answerId}`}/>
    </button>
    )
})
export class AnswerButton extends Component<AnswerButtonProps> {}
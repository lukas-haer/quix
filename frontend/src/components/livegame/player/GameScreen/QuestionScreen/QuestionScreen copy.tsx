import { Datex } from "datex-core-legacy/datex.ts";
import { Component, template } from "uix/components/Component.ts";

type DefaultQuestionScreenProps = {
    questionText: string;
    answers: string;
    currentDeadline: string;
    submitAnswer: (answerIndex: number) => void;
};

type FunctionQuestionScreenProps = DefaultQuestionScreenProps & { submittedAnswer: Datex.Pointer<boolean>; }
type ComponentQuestionScreenProps = DefaultQuestionScreenProps & { submittedAnswer: Datex.Pointer; }

@template(({ questionText, answers, currentDeadline, submittedAnswer, submitAnswer }: FunctionQuestionScreenProps) => {

  function handleAnswerClick(answerId: number) {
    //TODO: error handling
    submitAnswer(answerId);
    submittedAnswer.val = true;
  }


  return (
          <div>
          { !submittedAnswer.val ? (
            <>
            <h2>{questionText}</h2>
            <div style={{display: "flex", gap: "10px"}}>
            {
              answers.split(";").map((answer: string, index: number) => <AnswerButton answerText={answer} answerId={index} handleSubmit={() => handleAnswerClick(index)}/>)
            }
            </div>
            <h2>Deadline: {currentDeadline}</h2>
            </>
          )
            : <h2>Waiting for next Question.</h2>
          }
        </div>
  );
})
export class QuestionScreen extends Component<ComponentQuestionScreenProps> {}

type AnswerButtonProps = {
  answerText: string;
  answerId: number;
  handleSubmit: () => void;
}

@template(({answerText, answerId, handleSubmit}: AnswerButtonProps) => {
  const buttonColors = ['green', 'blue', 'red', 'yellow'];
  return(
    <button 
      style={{
              backgroundColor: buttonColors[answerId],
              border: 'none',
              borderRadius: '6px',
              height: '20vh',
              width: '20vh',
          }}
      onclick={handleSubmit}>
      {answerText}
    </button>
    )
})
export class AnswerButton extends Component<AnswerButtonProps> {}
import { Datex } from "datex-core-legacy/datex.ts";
import { Question } from "../../../models/Question.ts";

type QuestionScreenProps = {
    questionText: string;
    answers: string;
    currentDeadline: string;
    submittedAnswer: Datex.Pointer<boolean>;
    submitAnswer: (answerIndex: number) => void;
};

export default function QuestionScreen({ questionText, answers, currentDeadline, submittedAnswer, submitAnswer }: QuestionScreenProps) {

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
}

type AnswerButtonProps = {
  answerText: string;
  answerId: number;
  handleSubmit: () => void;
}

function AnswerButton({answerText, answerId, handleSubmit}: AnswerButtonProps){
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
}
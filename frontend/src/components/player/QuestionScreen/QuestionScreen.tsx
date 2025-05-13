import {Question} from "../../../models/Question.ts";

type QuestionScreenProps = {
    sendAnswer:(answer:number) => void;
    question:Question
};

export default function QuestionScreen({question, sendAnswer}:QuestionScreenProps) {
    const buttonColors = ['green', 'blue', 'red', 'yellow'];
    const answered = $(false);

    function handleAnswer(answer:number) {
        sendAnswer(answer)
        answered.val = true
        console.log(answered)
    }


    return (
      <>
          {(!answered.val) &&
          <div>
            <h2>{question.questionText}</h2>
              {question.answers.map((answer:string, index:number) => (
                <button
                  onclick={() => handleAnswer(index)}
                  style={{
                      backgroundColor: buttonColors[index],
                      border: 'none',
                      borderRadius: '6px',
                      height: '20vh',
                      width: '20vh',
                  }}
                />
              ))}
          </div>
          }
          {(answered.val) &&
          <h2>Warte auf Abschluss der Frage</h2>
          }
      </>
    );
}
type AnswerScreenProps = {
    correct:boolean
    currentScore:number
    howManyQuestionsCorrect:number
    howManyQuestionsTotal:number
};

export default function AnswerScreen({
                                         correct,
                                         currentScore,
                                         howManyQuestionsCorrect,
                                         howManyQuestionsTotal
                                     }:AnswerScreenProps) {

    const backgroundColor = correct ? 'green' : 'red';
    const title = correct ? 'RIGHT' : 'WRONG';

    return (
      <div
        style={{
            backgroundColor,
            height: '100vh',
            width: '100vw',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}
      >
          <h1>{title}</h1>
          <p>Score: {currentScore}</p>
          <p>
              Correct: {howManyQuestionsCorrect} / {howManyQuestionsTotal}
          </p>
      </div>
    );
}
export type  QuestionBase = {
    questionText: string;
    answers: string[];
    timeInSeconds: number;
};

export type SingleChoiceQuestion = QuestionBase & { correctAnswerId: number }

export type MultipleChoiceQuestion = QuestionBase & { correctAnswerIds: number[] }

export type Question = SingleChoiceQuestion | MultipleChoiceQuestion;

export const sampleQuestions: Question[] = [
    {
        questionText: "Frage 1: abcd?", 
        answers: ["a","b","c","d"], 
        correctAnswerId: 0, 
        timeInSeconds: 5
    },
    {
        questionText: "Frage 2: abcd?", 
        answers: ["a","b","c","d"], 
        correctAnswerId: 2, 
        timeInSeconds: 5
    }
]

export const sampleQuestion: SingleChoiceQuestion = {
    questionText: "Testfrage?",
    answers: ['A', 'B', 'C', 'D'],
    correctAnswerId: 0,
    timeInSeconds: 30,
};
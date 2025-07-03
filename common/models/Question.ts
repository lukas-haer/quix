export type  QuestionBase = {
    questionText: string;
    answers: string[];
    timeInSeconds: number;
};

export type SingleChoiceQuestionType = QuestionBase & { correctAnswerId: number }

export type MultipleChoiceQuestionType = QuestionBase & { correctAnswerIds: number[] }

export type QuestionType = SingleChoiceQuestionType | MultipleChoiceQuestionType;

export abstract class Question<Type> {
    readonly id: string;
    content: Type;

    constructor(content: Type){
        this.id = crypto.randomUUID();
        this.content = content;
    }

    abstract isCorrect(answer: any): boolean;
}

export class SingleChoiceQuestion extends Question<SingleChoiceQuestionType> {
    constructor(content: SingleChoiceQuestionType){
        super(content);
    }

    isCorrect(answer: number) {
        return answer === this.content.correctAnswerId;
    }
}

export class MultipleChoiceQuestion extends Question<MultipleChoiceQuestionType> {
    constructor(content: MultipleChoiceQuestionType){
        super(content);
    }

    isCorrect(answer: number[]) {
        const answerSet = new Set(answer);
        const correctAnswerSet = new Set(this.content.correctAnswerIds);
        //TODO: test this
        return correctAnswerSet.intersection(answerSet) === correctAnswerSet;
    }
}

const question1 = new SingleChoiceQuestion({
        questionText: "Frage 1: abcd?", 
        answers: ["a","b","c","d"], 
        correctAnswerId: 0, 
        timeInSeconds: 5
    })

const question2 = new SingleChoiceQuestion({
        questionText: "Frage 2: abcd?", 
        answers: ["a","b","c","d"], 
        correctAnswerId: 2, 
        timeInSeconds: 5
    })

export const sampleQuestions: Question<QuestionType>[] = [question1, question2];

export const sampleQuestion: SingleChoiceQuestion = question1;
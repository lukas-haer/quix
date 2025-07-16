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
    questionType: "singlechoise" | "multiplechoise"; // Only important for export and import

    constructor(content: Type, questionType: "singlechoise" | "multiplechoise"){
        this.id = crypto.randomUUID();
        this.content = content;
        this.questionType = questionType
    }

    abstract isCorrect(answer: any): boolean;
}

export class SingleChoiceQuestion extends Question<SingleChoiceQuestionType> {

    constructor(content: SingleChoiceQuestionType){
        super(content, "singlechoise");
    }

    isCorrect(answer: number) {
        return answer === this.content.correctAnswerId;
    }
}

export class MultipleChoiceQuestion extends Question<MultipleChoiceQuestionType> {
    constructor(content: MultipleChoiceQuestionType){
        super(content, "multiplechoise");
    }

    isCorrect(answer: number[]) {
        const answerSet = new Set(answer);
        const correctAnswerSet = new Set(this.content.correctAnswerIds);
        //TODO: test this
        return correctAnswerSet.intersection(answerSet) === correctAnswerSet;
    }
}

const question1 = new SingleChoiceQuestion({
    questionText: "Was ist das beste UIX Projekt",
    answers: ["Quix","Es ist Quix","Ich würde sagen Quix","Auch Quix"],
    correctAnswerId: 0,
    timeInSeconds: 30
})

const question2 = new SingleChoiceQuestion({
    questionText: "Wer der erste deutsche Bundeskanzler?",
    answers: ["Angela Merkel","Axel Küpper","Konrad Adenauer","Theodor Heuss"],
    correctAnswerId: 2,
    timeInSeconds: 15
})

const question3 = new SingleChoiceQuestion({
    questionText: "D ist richtig",
    answers: ["A","D","C","B"],
    correctAnswerId: 1,
    timeInSeconds: 5
})

const question4 = new SingleChoiceQuestion({
    questionText: "A ist richtig",
    answers: ["A","D","C","B"],
    correctAnswerId: 0,
    timeInSeconds: 120
})

export const sampleQuestions: Question<QuestionType>[] = [question1];

export const sampleQuestion: SingleChoiceQuestion = question1;
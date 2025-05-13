export type  Question = {
    questionText:string;
    type:'singleChoice' | 'multipleChoice';
    answers:string[];
    timeLimit:number; //Zeitlimit in sekunden
};

export const sampleQuestion:Question = {
    questionText: "Testfrage?",
    type: 'singleChoice' as 'singleChoice',
    answers: ['A', 'B', 'C', 'D'],
    timeLimit: 30,
};
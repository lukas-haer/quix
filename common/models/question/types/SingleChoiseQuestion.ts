export type SingleChoiceQuestion = {
	questionText: string;
	answers: {
		a: string;
		b: string;
		c: string;
		d: string;
	};
	correctAnswer: string;
}
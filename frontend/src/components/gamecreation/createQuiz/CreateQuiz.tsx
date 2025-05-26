import { Component, template } from "uix/components/Component.ts";
import { CreateSingleChoiseQuestion } from "./types/CreateSingleChoiseQuestion.tsx"


/**
 * Example data for a quiz. In production, this would only contaion default values.
 * 
 * @property {string} id - Unique identifier for the quiz.
 * @property {string} title - Title of the quiz.
 * @property {Object} madeby - Information about the creator of the quiz.	
 * @property {Array<Question>} questions - Array of questions in the quiz.
 * 
 */
const quiz = $({
	id: crypto.randomUUID(),
	title: "My first Quix",
	description: "This is a quiz about frontend development.",
	madeby: {
		accountId: "account-1",
		name: "John Doe",
	},
    questions: [
        {
			id: crypto.randomUUID(),
            type: "single-choice",
            questionContent: {
                questionText: "What is the best Frontend Framework?",
                answers: {
                    a: "React",
                    b: "Vue",
                    c: "Angular",
                    d: "UIX",
                },
                correctAnswer: "d",
            },
        },
        {
			id: crypto.randomUUID(),
            type: "single-choice",
            questionContent: {
                questionText: "What is the best Frontend Framework?",
                answers: {
                    a: "Reverse Hashing",
                    b: "Reactivity",
                    c: "Responsive Design",
                    d: "Cross-Realm Functions",
                },
                correctAnswer: "a",
            },
        },
    ],
});

/**
 * A function to add a question to the currently edited quiz.
 * @param type - The type of question to add. Currently only supports 'single-choice'.
 */
function addQuestion(type:string) {

	// First checks für Type of Question. Currently only 'single-choice' is supported.
	if (type === 'single-choise') {
		quiz.questions.push({
			id: crypto.randomUUID(),
			type: "single-choice",
			questionContent: {
				questionText: "",
				answers: {
					a: "",
					b: "",
					c: "",
					d: "",
				},
				correctAnswer: "a",
			},
		});
	} else {
		alert("Unsupported question type");
		console.error("Unsupported question type:", type);
		return;
	}
}

export function removeQuestionById(questionId: string) {
	try {
  const questionIndex = quiz.questions.findIndex(q => q.id === questionId);
  const removedQuestion = quiz.questions.splice(questionIndex,1); 
  
  console.log("Removed question: ", removedQuestion[0].id);
	} catch (error) {	
		console.error("Error removing question:", error);
		alert("An error occurred while removing the question. Please try again.");
	}
}

/**
 * Exports the current quiz as a JSON file.
 * The file will be named `quiz-{quiz.id}.json`.
 */
function exportQuestionSet() {
    const jsonStr = JSON.stringify(quiz, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz-${quiz.id}.json`;
    a.click();

    URL.revokeObjectURL(url);
}


@template(() => (
    <section>
        <h2>Create a Quiz</h2>
		<h1> {quiz.title} </h1>
        <div class="game-creation-container">
            <h3>Quiz Settings</h3>
            <div class="gc-row">
                <div class="gc-col gc-col-6">
                    <label for="quizTitle">Quiz Title</label>
                    <input type="text" id="quizTitle" value={quiz.title} />
                </div>
                <div class="gc-col-6">
                    <label for="quizId">Quiz-ID</label>
                    <input type="text" id="quizId" value={quiz.id} disabled />
                </div>
            </div>
        </div>
        <div>
            {quiz.questions.map((question) => {
                if (question.type === "single-choice") {
                    return (
                        <div>
                            <CreateSingleChoiseQuestion
                                question={question}
                                id={question.id}
                            />
                        </div>
                    );
                }
                return null;
            })}
        </div>

        <textarea name="" id="">
            {JSON.stringify(quiz, null, 2)}
        </textarea>

        <button type="button" onclick={() => addQuestion("single-choise")}>
            {" "}
            Add Singlechoise Question{" "}
        </button>

        <button type="button" onclick={exportQuestionSet}>
            Export
        </button>
        <button type="button" onclick={() => console.log(quiz)}>
            Log
        </button>
    </section>
))
export class CreateQuiz extends Component {}
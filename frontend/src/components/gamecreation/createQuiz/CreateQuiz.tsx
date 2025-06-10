import { Component, template } from "uix/components/Component.ts";
import { CreateSingleChoiseQuestion } from "./types/CreateSingleChoiseQuestion.tsx";
import { Question } from "common/models/question/Question.ts";

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
            position: 2,
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
            position: 1,
            type: "single-choice",
            questionContent: {
                questionText: "Which technology does not exitst?",
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
 * A reactive selector for the add question type select.
 */
const addQuestionType = $("");

/**
 * A function to add a question to the currently edited quiz.
 * @param type - The type of question to add. Currently only supports 'single-choice'.
 */
function addQuestion() {
    const type = addQuestionType.val;
    // First checks für Type of Question. Currently only 'single-choice' is supported.
    if (type === "single-choise") {
        quiz.questions.push({
            id: crypto.randomUUID(),
            type: "single-choice",
            position: quiz.questions.length + 1,
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

/**
 * 
 * @param questionId - The ID of the question to remove.
 * This function removes a question from the quiz by its ID.
 */
export function removeQuestionById(questionId: string) {
    try {
        const questionIndex = quiz.questions.findIndex(
            (q) => q.id === questionId
        );
        const removedQuestion = quiz.questions.splice(questionIndex, 1);

        const removedPosition = removedQuestion[0]?.position;
        if (removedPosition !== undefined) {
            quiz.questions.forEach((q) => {
                if (q.position > removedPosition) {
                    q.position -= 1;
                }
            });
        }

        console.log("Removed question: ", removedQuestion[0].id);
    } catch (error) {
        console.error("Error removing question:", error);
        alert(
            "An error occurred while removing the question. Please try again."
        );
    }
}

/**
 * Feedback field for the Question Export. 
 */
const questionExportFeedback = $("");

/**
 * Exports the current quiz as a JSON file.
 * The file will be named `quiz-{quiz.id}.json`.
 */
function exportQuestionSet() {
	questionExportFeedback.val = "";

	try {
		// Sanitize title for export
	const fileName = `quix-${quiz.title.replace(/\s+/g, "-").toLowerCase()}.json`;

    const jsonStr = JSON.stringify(quiz, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(url);

	questionExportFeedback.val = "Quiz exported successfully!";

	setTimeout(() => {
		questionExportFeedback.val = "";
	}, 5000);
	} catch (error) {
		console.error("Error exporting quiz:", error);
		questionExportFeedback.val = "An error occurred while exporting the quiz.";

		return;
	}
}

@template(() => (
    <section>
        <header class="gc-row">
            <div class="gc-col gc-col-9">
                <h2>Create a Quiz</h2>
                <h1> {quiz.title} </h1>
            </div>
            <div class="gc-col gc-col-3 vertically-centered align-right">
				<div>

                	<button
                	    type="button"
                	    id="export-btn"
                	    onclick={exportQuestionSet}
						>
                	    Export
                	</button>
					<p class="margin0" id="export-feedback"> {questionExportFeedback} </p>
				</div>
            </div>
        </header>
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
			
            {quiz.questions.sort((a, b) => a.position - b.position).map((question) => {
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
        <div>
            <select
                name="AddQuestion"
                id="addQuestion-select"
                value={addQuestionType}
            >
                <option selected disabled value="">
                    Select a Question-Type
                </option>
                <option value="single-choise">Single-Choise</option>
            </select>
            <button type="button" class={"btn bgcolor-A"} onclick={addQuestion}>
                Add
            </button>
        </div>
    </section>
))
export class CreateQuiz extends Component {}

/*
########### Debugging-Tools ###########

       <hr />
        <h1>Debug</h1>

        <textarea style={"height: 500px"} name="" id="">
            {JSON.stringify(quiz, null, 2)}
        </textarea>

        <button type="button" onclick={() => console.log(quiz)}>
            Log
        </button>




*/

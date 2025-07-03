import { Component, template } from "uix/components/Component.ts";
import { CreateSingleChoiceQuestion } from "./types/CreateSingleChoiceQuestion.tsx";
import { Question, QuestionType, SingleChoiceQuestion } from "common/models/Question.ts";
import { saveQuiz } from "backend/SaveQuiz.ts";
import { Quiz } from "common/models/Quiz.tsx";

/**
 * Example data for a quiz. In production, this would only contaion default values.
 *
 * @property {string} quizId - Unique identifier for the quiz.
 * @property {string} title - Title of the quiz.
 * @property {string} description - Description of the quiz.
 * @property {Object} accountId - Information about the creator of the quiz.
 * @property {Array<Question>} questions - Array of questions in the quiz.
 *
 */
let quiz = $(Quiz ({
    quizId: crypto.randomUUID(),
    title: "",
    description: "",
    accountId: "", //beim backend speichern gesetzt
    questions: [] //as SingleChoiceQuestion[] ? //später noch um weitere Typen erweitern
}));


/**
 * A reactive selector for the add question type select.
 * When calling addQuestion() (expanding the quix.questions-array) 
 * the value of this var determines the type the appendet question will have.
 */
const addQuestionType = $("");

/**
 * A function to add a question to the currently edited quiz.
 * The type of question to add. Currently only supports 'single-choice'.
 */
function addQuestion() {
    const type = addQuestionType.val;
    // First checks für Type of Question. Currently only 'single-choice' is supported.
    if (type === "single-choice") {
        quiz.questions.push(new SingleChoiceQuestion({
            questionText: "",
            answers: ["", "", "", ""],
            correctAnswerId: 0,
            timeInSeconds: 5
        }));
    } else {
        alert("Unsupported question type");
        console.error("Unsupported question type:", type);
        return;
    }
}

function refresh() {
    quiz.questions = [...quiz.questions];
}

/**
 * 
 * @param questionId - The ID of the question to remove.
 * This function removes a question from the quiz by its ID.
 */
export function removeQuestionById(questionId: string) {
    try {
        //Find question index by id
        const questionIndex = quiz.questions.findIndex(
            (q) => q.id === questionId
        );

        if(questionIndex == -1) {
            throw new Error(`The question with the id ${questionId} could not be found, and therefore was not removed`)
        }
 
        //remove that index
        const removedQuestion = quiz.questions.splice(questionIndex, 1);

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
 * TODO: Replace with snackbar
 */
const questionExportFeedback = $("");

/**
 * Exports the current quiz as a JSON file.
 * The file will be named `quiz-{quiz.id}.json`.
 */
function exportQuestionSet() {
	questionExportFeedback.val = "";

	try {
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
    <form action={saveQuiz} method="post">
        <header class="gc-row">
            <div class="gc-col gc-col-9">
                <h2>Create a Quiz</h2>
                <h1> {quiz.title} </h1>
            </div>
            <div class="gc-col gc-col-3 vertically-centered align-right">
				<div>
                	<button type="button" id="export-btn" onclick={exportQuestionSet}>
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
                    <input type="text" id="quizTitle" name="title" value={quiz.title} />
                </div>
                <div class="gc-col-6">
                    <label for="quizId">Quiz-ID</label>
                    <input type="text" id="quizId" name="quizId" value={quiz.quizId} readonly/>
                </div>
            </div>
            <div>
                <label for="quizDescription">Quiz Description</label>
                <input type="text" id="quizDescription" name="description" value={quiz.description} />
            </div>
        </div>
        <div>
            {quiz.questions.map((question: Question<QuestionType>) => {
                if (question instanceof SingleChoiceQuestion) {
                    return (
                        <div>
                            <CreateSingleChoiceQuestion question={question}/>
                        </div>
                    );
                }
                return null;
            })}
        </div>
        <div>
            <select name="AddQuestion" id="addQuestion-select" value={addQuestionType}>
                <option selected disabled value="">
                    Select a Question-Type
                </option>
                <option value="single-choice">Single-Choice</option>
            </select>
            <button type="button" class="btn bgcolor-A" onclick={addQuestion}>
                Add
            </button>
        </div>
        <input type="hidden" name="questions" value={JSON.stringify(quiz.questions.map((q) => ({
                id: q.id,
                type: "single-choice",
                content: q.content
            })))}
        />
        <button type="submit" onclick={refresh}>Save Quiz</button>
    </form>
    </section>  
))
/*
//########### Debugging-Tools ###########
        <hr />
        <h1>Debug</h1>

        <textarea style={"height: 500px"} name="" id="">
            {JSON.stringify(quiz, null, 2)}
        </textarea>

        <button type="button" onclick={() => console.log(quiz)}>
            Log
        </button>

        */
export class CreateQuiz extends Component {}
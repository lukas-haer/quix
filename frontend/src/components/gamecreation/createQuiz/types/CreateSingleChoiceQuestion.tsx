import { Component, template } from 'uix/components/Component.ts';
import { SingleChoiceQuestion } from '../../../../models/Question.ts';
import { removeQuestionById } from 'frontend/src/components/gamecreation/createQuiz/CreateQuiz.tsx';

@template(props => {
    const question = props.question as SingleChoiceQuestion;
    const questionContent = $(props.question.content);
    const answers = questionContent.answers;

    return (
        <div class="game-creation-container">
            <h3>Question </h3>
            <label for={`questionText-${question.id}`}>Question-Text:</label>
            <textarea id={`questionText-${question.id}`} placeholder="Add question Text here...">
                {questionContent.questionText}
            </textarea>
            <div class="gc-row">
                <div class="gc-col gc-col-6">
                    <div class="input-group-container">
                        <p class="input-group-text bgcolor-A">A: </p>
                        <input class="input-field" type="text" placeholder="Answer A" value={answers[0]} />
                    </div>
                </div>
                <div class="gc-col gc-col-6">
                    <div class="input-group-container">
                        <p class="input-group-text bgcolor-B">B: </p>
                        <input class="input-field" type="text" placeholder="Answer B" value={answers[1]} />
                    </div>
                </div>
            </div>
            <div class="gc-row">
                <div class="gc-col gc-col-6">
                    <div class="input-group-container">
                        <p class="input-group-text bgcolor-C">C: </p>
                        <input class="input-field" type="text" placeholder="Answer C" value={answers[2]} />
                    </div>
                </div>
                <div class="gc-col gc-col-6">
                    <div class="input-group-container">
                        <p class="input-group-text bgcolor-D">D: </p>
                        <input class="input-field" type="text" placeholder="Answer D" value={answers[3]} />
                    </div>
                </div>
            </div>
            <div class="gc-row vertically-centered ">
                <div class="gc-col gc-col-6">
                    <span class="mr-10">Correct Answer:</span>
                    <button
                        type="button"
                        class={questionContent.correctAnswerId === 0 ? 'btn bgcolor-A selected' : 'btn bgcolor-A'}
                        onclick={() => (questionContent.correctAnswerId = 0)}
                    >
                        A
                    </button>
                    <button
                        type="button"
                        class={questionContent.correctAnswerId === 1 ? 'btn bgcolor-B selected' : 'btn bgcolor-B'}
                        onclick={() => {
                            questionContent.correctAnswerId = 1;
                        }}
                    >
                        B
                    </button>
                    <button
                        type="button"
                        class={questionContent.correctAnswerId === 2 ? 'btn bgcolor-C selected' : 'btn bgcolor-C'}
                        onclick={() => (questionContent.correctAnswerId = 2)}
                    >
                        C
                    </button>
                    <button
                        type="button"
                        class={questionContent.correctAnswerId === 3 ? 'btn bgcolor-D selected' : 'btn bgcolor-D'}
                        onclick={() => (questionContent.correctAnswerId = 3)}
                    >
                        D
                    </button>
                </div>

                <div class="gc-col gc-col-6 mb-15 time-input-row vertically-centered align-right" >
                    <label for="timeSelect" class="mr-10" >Time Limit:</label>
                    <select
                        id="timeSelect"
                        class="time-input"
                        value={questionContent.timeInSeconds}
                    >
                        <option value="15">15 seconds</option>
                        <option value="30" selected>30 seconds</option>
                        <option value="45">45 seconds</option>
                        <option value="60">1 minute</option>
                        <option value="90">1:30 minutes</option>
                        <option value="120">2 minutes</option>
                        <option value="150">2:30 minutes</option>
                        <option value="180">3 minutes</option>
                    </select>
                </div>
            </div>

            <button type="button" class="btn bgcolor-D" onclick={() => removeQuestionById(question.id)}>
                Delete Question
            </button>
        </div>
    );
})
export class CreateSingleChoiceQuestion extends Component<{ question: SingleChoiceQuestion }> {}

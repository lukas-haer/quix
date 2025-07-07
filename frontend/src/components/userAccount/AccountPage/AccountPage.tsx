import { provideRedirect } from "uix/providers/common.tsx";
import { Context } from "uix/routing/context.ts";
import { users } from "backend/UserAccounts/UserAuthentication.ts";
import { Quiz } from "common/models/Quiz.ts";
import { quizzes } from "backend/SaveQuiz.ts";
import { Component, template } from "uix/components/Component.ts";

@template(function ({ userId }) {

	const currentUser = userId;
	console.log("Log Accountpage current user: ", currentUser);

	if (!currentUser) {
		console.error("LOG AccountPage: no user logged in");
		//return provideRedirect("/login");
	}

	const userQuizzes = Object.values(quizzes).filter(quiz => quiz.accountId === currentUser);
		
	console.log("LOG AccountPage");
	console.log("Quiz of user", currentUser);

	for (const quiz of userQuizzes) {
		console.log("Quiz ID:", quiz.quizId);
		console.log("Title:", quiz.title);
		console.log("Description:", quiz.description);
		console.log("Questions:", quiz.questions);
		console.log("-----------------------------");
	}

	return (
		<body>
			<button class="logout-button" type="button" onclick={() => redirect("/")}>Go to home</button>
			<h1>{ currentUser }s Quizzes</h1>
			{
				userQuizzes.length === 0 
			?(
				<div> 
					<div class="no-quizzes-message">You don't have any Quizzes for now</div> 
					<div class="quiz-section-divider"></div>
					<div class="quiz-container">
						<div class="create-card">
							<h3>Create your First Quiz</h3>
							<a href="/createQuiz"><button class="button" type="button" id="createQuiz-btn">Create</button></a>
						</div>
					</div>
				</div>
			): (
				<div>
					<div class="quiz-section-divider"></div>
					<div class="quiz-container">
						{userQuizzes.map((quiz: Quiz) => (
							<div class="quiz-card">
								<h3>{ quiz.title }</h3>
								<p>{ quiz.description }</p>
								<div>
									<button class="button" type="button">Edit</button>
									<a href={`/host/${quiz.quizId}`}><button class="button" type="button">Host</button></a>
									<button class="button delete-button" type="button">Delete</button>
								</div>
							</div>
						))}
						<div class="create-card">
							<h3>Create another Quiz</h3>
							<a href="/createQuiz"><button class="button" type="button" id="createQuiz-btn">Create</button></a>
						</div>	
					</div>			
				</div>
			)}
		</body>
	)
})

export class AccountPage extends Component<{ userId : string }> {}
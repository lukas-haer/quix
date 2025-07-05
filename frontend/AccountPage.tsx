import { provideRedirect } from "uix/providers/common.tsx";
import { Context } from "uix/routing/context.ts";
import { users } from "backend/UserAccounts/UserAuthentication.ts";
import { Quiz } from "../common/models/Quiz.ts";
import { quizzes } from "backend/SaveQuiz.ts";

export default async function AccountPage ({ userId }: { userId: string }) {
	
	//KLAPPT DAS IM FRONTEND?
	const session = await Context.getPrivateData(datex.meta.caller);
	const sessionUser = session.userId;
	console.log("LOG AccountPage user über Context und nicht als Param: ", sessionUser);

	const currentUser = userId;
	console.log("Log Accountpage current user: ", currentUser);

	if (!currentUser) {
		console.error("LOG AccountPage: no user logged in");
		//return provideRedirect("/login");
	}

	const userQuizzes = Object.values(quizzes).filter(quiz => quiz.accountId === currentUser);

	console.log("LOGGING FOR ACCOUNT PAGE");
	console.log("LOG Length of current user quizzes:", userQuizzes.length);
	
		console.log("-------------------------------");
		console.log("LOG Updated users quizzes as Object:", userQuizzes);
		console.log("-------------------------------");
		console.log();
		console.log("-------------------------------");
		for (const quiz of userQuizzes) {
			console.log("LOG QUIZZES AT ACCOUNT");
			console.log("Quiz of user", quiz.accountId);
			console.log("Quiz ID:", quiz.quizId);
			console.log("Title:", quiz.title);
			console.log("Description:", quiz.description);
			console.log("Questions:", quiz.questions);
			console.log("-----------------------------");
		}

	return (

		<div>
			<h1>{ currentUser }s Quizzes</h1>
			{
				userQuizzes.length === 0 
			? 
				<div> 
					<p>You dont have any Quizzes for now</p> 
					<a href="/createQuiz"><button type="button" id="createQuiz-btn">Create your first Quiz</button></a>
				</div>
			: 
				<div>
					<ol>
						{userQuizzes.map((quiz : Quiz) => (
							<li> 
								<strong>{ quiz.title }</strong> <br/> { quiz.description }
								<a href={`/host/${quiz.quizId}`}><button type="button" id="hostQuiz-btn">Host your Quiz</button></a>

							</li>
						))}
					</ol>
					<a href="/createQuiz"><button type="button" id="createQuiz-btn">Create another Quiz</button></a>
				</div>
			}
		</div>
	)
}			
//					<button type="submit" onclick={() => `/host/${quiz.quizId}`}>Host this Quiz</button>							

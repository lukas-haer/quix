import { provideRedirect } from "uix/providers/common.tsx";
import { Context } from "uix/routing/context.ts";
import { users } from "backend/UserAccounts/UserAuthentication.ts";
import { Quiz } from "common/models/Quiz.tsx";
import { quizzes } from "backend/SaveQuiz.ts";

export async function accountPage (ctx: Context) {
	
	const session = await Context.getPrivateData(datex.meta.caller);
	const currentUser = session.userId;

	if (!currentUser) {
		console.error("LOG AccountPage: no user logged in");
		return provideRedirect("/login");
	}

	const userQuizzes = Object.values(quizzes).filter(quiz => quiz.accountId === currentUser);

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
							</li>
						))}
					</ol>
					<a href="/createQuiz"><button type="button" id="createQuiz-btn">Create another Quiz</button></a>
				</div>
			}
		</div>
	)
}

import { provideRedirect } from "uix/providers/common.tsx";
import { Context } from "uix/routing/context.ts";
import { users } from "backend/UserAccountData.ts";
import { Quiz } from "common/Quiz.tsx";

export async function accountPage (ctx: Context) {
	const session = await ctx.getPrivateData();
	const userId = session.userId;

	if (!userId) {
		console.error("no user logged in");
		return provideRedirect("/login");
	}

	const quizzes = Object.values(users[userId].quizzes);

	return (
		<div>
			<h1>{ userId }s Quizzes</h1>
			{
				quizzes.length === 0 
			? 
				<div> 
					<p>You dont have any Quizzes for now</p> 
					<a href="/createQuiz"><button type="button" id="createQuiz-btn">Create your first Quiz</button></a>
				</div>
			: 
				<div>
					<ol>
						{quizzes.map((quiz : Quiz) => (
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

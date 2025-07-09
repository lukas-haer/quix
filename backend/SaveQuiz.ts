import { Context } from "uix/routing/context.ts";
import { users } from "backend/UserAccounts/UserAuthentication.ts";
import { Quiz } from "../common/models/Quiz.ts";
import { provideRedirect } from "uix/providers/common.tsx";
import { SingleChoiceQuestion, MultipleChoiceQuestion } from "common/models/Question.ts";

export const quizzes = eternal ?? $({} as Record<string, Quiz>); //TODO: make quizzes object unavailable for frontend import. Use getUserQuizzes instead

export async function saveQuiz (ctx: Context) {

	const session = await Context.getPrivateData(datex.meta.caller);
	const currentUser = session.userId;

	console.log("LOG SaveQuiz: current session: ", session)
	console.log("LOG SaveQuiz: current session user: ", session.userId)

	if(!currentUser || !(currentUser in users)) {
		console.error("LOG SaveQuiz: User not found or not logged in."); //TODO Zugriffsbegrenzung?
		return provideRedirect("/");
	}

	const data = await ctx.request.formData();
	
	const quizId = data.get("quizId") as string;
	const title = data.get("title") as string;
	const description = data.get("description") as string;
	const accountId = currentUser;
	//questions
	const rawQuestions = JSON.parse(data.get("questions") as string);
	const mappedQuestions = rawQuestions.map((q: any) => {
    	if (q.type === "single-choice") {
        	return new SingleChoiceQuestion(q.content);
    	} else if (q.type === "multiple-choice") {
        	return new MultipleChoiceQuestion(q.content);
    	}
	});
	const questions = mappedQuestions;
	
	quizzes[quizId] = Quiz ({
		quizId: quizId,
		title : title,
		description : description,
		accountId : accountId,
		questions : questions
	})

	//quizzes of user x
	const userQuizzes = Object.values(quizzes).filter(quiz => quiz.accountId === currentUser);

	
	for (const quiz of userQuizzes) {
		console.log("Quiz of user", quiz.accountId);
		console.log("Quiz ID:", quiz.quizId);
		console.log("Title:", quiz.title);
		console.log("Description:", quiz.description);
		console.log("Questions:", quiz.questions);
		console.log("-----------------------------");
	}

	return provideRedirect(`/account/${currentUser}`);
}

export async function getUserQuizzes() {
	const session = await Context.getPrivateData(datex.meta.caller);
	const currentUser = session.userId;

	if(!currentUser || !(currentUser in users)) {
		console.error("LOG getUserQuizzes: User not found or not logged in.");
		//TODO: throw error for user feedback in frontend?
		return provideRedirect("/");
	}

	//TODO: race conditions? what happens if quiz is modified/deleted while filtering?
	const userQuizzes = quizzes.filter((quiz: Quiz) => quiz.accountId === currentUser);

	return userQuizzes
}
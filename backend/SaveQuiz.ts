import { Context } from "uix/routing/context.ts";
import { users } from "backend/UserAccounts/UserAuthentication.ts";
import { Quiz } from "common/models/Quiz.tsx";
import { provideRedirect } from "uix/providers/common.tsx";
import { SingleChoiceQuestion, MultipleChoiceQuestion } from "common/models/Question.ts";

export const quizzes = eternal ?? $({} as Record<string, Quiz>);

export async function saveQuiz (ctx: Context) {

	const session = await Context.getPrivateData(datex.meta.caller);
	const currentUser = session.userId;

	console.log("LOG SaveQuiz: current session: ", session)
	console.log("LOG SaveQuiz: current session user: ", session.userId)


	////////////////bearbeiten
	if(!currentUser || !(currentUser in users)) {
		console.error("User not found or not logged in."); //braucht funktionalen Error
		//!!!!!!!sollte nicht alle Eingaben verwerfen, sondern nur Möglichkeit zur anmelden / einloggen geben und da dann das Quiz speichern
		return provideRedirect("/"); //hier snackbar fehler bitte melde dich erst an
	}
	////////////////bearbeiten

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

	/*
	const quiz: Quiz = {
        quizId: data.get("quizId") as string,
        title: data.get("title") as string,
        description: data.get("description") as string,
        accountId: userId,
        //questions: JSON.parse(data.get("questions") as string),
		questions: mappedQuestions
    };
	*/

	console.log("LOG -------------Quiz saved:-------------", quizzes[quizId]);
	console.log("-------------------------------");
	console.log();

	////////////////bearbeiten
	if (!users[currentUser]) {
		// Falls User nicht da ist, redirect zum Anlegen oder Fehler werfen
		console.error("User not found in users store:", currentUser);
		return;
	}
	////////////////bearbeiten

	//quizzes of user x: 
	const userQuizzes = Object.values(quizzes).filter(quiz => quiz.accountId === currentUser);

	console.log("-------------------------------");
	console.log("Updated users quizzes as Object:", userQuizzes)
	console.log("-------------------------------");
	console.log();
	console.log("-------------------------------");
	for (const quiz of userQuizzes) {
		console.log("Quiz of user", quiz.accountId);
		console.log("Quiz ID:", quiz.quizId);
		console.log("Title:", quiz.title);
		console.log("Description:", quiz.description);
		console.log("Questions:", quiz.questions);
		console.log("-----------------------------");
	}

	return provideRedirect("/account");
}
import { Context } from "uix/routing/context.ts";
import { users } from "backend/UserAccountData.ts";
import { Quiz } from "common/Quiz.tsx";
import { provideRedirect } from "uix/providers/common.tsx";
import { SingleChoiceQuestion, MultipleChoiceQuestion } from "common/Question.ts";

export async function saveQuiz (ctx: Context) {
	const session = await ctx.getPrivateData();
	const userId = session.userId;

	if(!userId || !(userId in users)) {
		console.error("User not found or not logged in."); //braucht funktionalen Error
		return;
	}

	const data = await ctx.request.formData();

	//questions
	const rawQuestions = JSON.parse(data.get("questions") as string);
	const mappedQuestions = rawQuestions.map((q: any) => {
    	if (q.type === "single-choice") {
        	return new SingleChoiceQuestion(q.content);
    	} else if (q.type === "multiple-choice") {
        	return new MultipleChoiceQuestion(q.content);
    	}
	});

	const quiz: Quiz = {
        quizId: data.get("quizId") as string,
        title: data.get("title") as string,
        description: data.get("description") as string,
        accountId: userId,
        //questions: JSON.parse(data.get("questions") as string),
		questions: mappedQuestions
    };

	console.log("LOG -------------Quiz data received:-------------", quiz);
	console.log("LOG -------------Quiz data received ENDE -------------");

	if (!users[userId]) {
		// Falls User nicht da ist, redirect zum Anlegen oder Fehler werfen
		console.error("User not found in users store:", userId);
		return;
	}

	//console.log("LOG VOR SAVE -------------------------")
	//console.log("userId:", userId);
	//console.log("users:", users);
	//console.log("userObj:", users[userId]);
	//console.log("LOG VOR SAVE ENDE -------------------------")

	/*----------------------------------------------------------------------------------------------------
	const userObj = users[userId];
	if (!userObj.quizzes) {
		userObj.quizzes = {};
	}
	userObj.quizzes[quiz.quizId] = quiz;
	*/

	//users[userId].quizzes.push(quiz);


	users[userId].quizzes[quiz.quizId] = quiz;

	console.log("Quiz saved for user:", userId);
	console.log("LOG NACH SAVE -------------------------")
	console.log("Updated user quizzes:", users[userId].quizzes);
	console.log("users:", users);
	//console.log("userObj:", users[userId]);

    return provideRedirect("/");
}
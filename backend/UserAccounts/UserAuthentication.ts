import { Context } from "uix/routing/context.ts";
import { User } from "common/models/User.ts";
import { quizzes } from "../SaveQuiz.ts";
import { Quiz } from "common/models/Quiz.tsx";

import * as argon2 from "jsr:@felix/argon2";
import { provideRedirect } from "uix/providers/common.tsx";
import { InvalidPasswordError, UsernameTakenError, UserNotFoundError, WeakPasswordError } from "common/models/errors/accountErrors.ts";

export const users = eternal ?? $({} as Record<string, User>);

declare global {
	interface PrivateData {
		userId?: string
	}
};

//Login
export async function userLogin(username: string, password: string) {
	
	//user doesn't exist
	if (!(username in users)) {
		throw new UserNotFoundError();
	}	

	//wrong password for user
	if (!await argon2.verify(users[username].password, password)) {
		throw new InvalidPasswordError();
	}

	console.log(`Logging in user ${username}`);


	//if login successful, setting session
	const session = await Context.getPrivateData(datex.meta.caller);
	session.userId = username;

	//////////////////////////LOGGING///////////////////////////////////////
	const userQuizzes = Object.values(quizzes).filter(quiz => quiz.accountId === username);

	if (userQuizzes.length === 0) {
		console.log("User has no Quizzes yet")
	}
	else {

		console.log(username,"s Quizzes-------------------")
		for (const quiz of userQuizzes) {
			console.log("Quizzes of user ", quiz.accountId);
			console.log("Quiz ID:", quiz.quizId);
			console.log("Title:", quiz.title);
			console.log("Description:", quiz.description);
			console.log("Questions:", quiz.questions);
			console.log("-----------------------------");
		}
	}
	//////////////////////////LOGGING///////////////////////////////////////

	return true; //TODO sollte irgendwann auf Account Startseite weiterleiten
}


//Signup
export async function userSignUp(username: string, password: string) {

	console.log("LOGGING ALLE USER users:", users);

	//wrong password for existing user
	if (!isValidPassword(password)) {
		throw new WeakPasswordError();
	}

	//user already exists
	if (username in users) {
		throw new UsernameTakenError();
	}
	
	console.log(`Registering user ${username}`);

	//creating new user
	if (!(username in users)) {
	users[username] = User({
		id: username,
		password: await argon2.hash(password),
		//quizzes: [] // oder mit {}
	});
	console.log("Registering new user successful:", username);

	//if signup successful, setting session
	const session = await Context.getPrivateData(datex.meta.caller);
	session.userId = username;
	return true; //TODO sollte irgendwann auf Account Startseite weiterleiten
	}
}

//Password validation
function isValidPassword (password: string) : boolean {
	const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
	return regex.test(password);
}

//user logout
export async function logout (ctx: Context) {
	const session = await ctx.getPrivateData();
	const currentUser = session.userId;

	if (currentUser) {
		session.userId = undefined
		console.log("User logged out, userId shouldn't be set anymore: ", session.userId)
	} else {
		throw new Error ("No current user logged in that could be logged out");
	}
	return provideRedirect("/");
}

@endpoint
export class Account {
	@property static async getCurrentUser() {
		const session = await Context.getPrivateData(datex.meta);
		return session.userId;
	}
}
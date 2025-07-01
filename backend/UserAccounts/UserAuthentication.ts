import { Context } from "uix/routing/context.ts";
import { User } from "common/models/User.ts";
import { quizzes } from "../SaveQuiz.ts";
import { Quiz } from "common/models/Quiz.tsx";

import * as argon2 from "jsr:@felix/argon2";
import { provideRedirect } from "uix/providers/common.tsx";

export const users = eternal ?? $({} as Record<string, User>);

declare global {
	interface PrivateData {
		userId?: string
	}
};

//Login
export async function userLogin(ctx: Context) {


	//receives context with credentials from userLogin function
	const data = await ctx.request.formData();
	const user = data.get("user") as string;
	const password = data.get("password") as string;

	//user doesn't exist
	if (!(user in users)) {
		return provideRedirect("/login?error=user_not_found");
	}

	//wrong password for user
	if (!await argon2.verify(users[user].password, password)) {
		return provideRedirect("/login?error=invalid_password");
	}

	console.log(`Logging in user ${user}`);


	//if login successful, setting session
	const session = await ctx.getPrivateData();
	session.userId = user;


	//////////////////////////LOGGING///////////////////////////////////////
	const userQuizzes = Object.values(quizzes).filter(quiz => quiz.accountId === user);

	if (userQuizzes.length === 0) {
		console.log("User has no Quizzes yet")
	}
	else {

		console.log(user,"s Quizzes-------------------")
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

	return provideRedirect("/account");
}


//Signup
export async function userSignUp(ctx: Context) {

	console.log("LOGGING ALLE USER users:", users);

	//receives context with credentials from userSignUp function
	const data = await ctx.request.formData();
	const user = data.get("user") as string;
	const password = data.get("password") as string;

	//wrong password for existing user
	if (!PasswordIsValid(password)) {
		return provideRedirect("/signup?error=invalid_password");
	}

	//user already exists
	if (user in users) {
		return provideRedirect("/signup?error=user_already_exists");
	}
	
	console.log(`Registering user ${user}`);

	//creating new user
	if (!(user in users) && PasswordIsValid(password)) {
	users[user] = User({
		id: user,
		password: await argon2.hash(password),
		//quizzes: [] // oder mit {}
	});
	console.log("Registering new user successful:", user);

	//if signup successful, setting session
	const session = await ctx.getPrivateData();
	session.userId = user;
	return provideRedirect("/account");
	}
}

//Password validation
function PasswordIsValid (password: string) : boolean {
	const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
	return regex.test(password);
}
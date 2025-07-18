import { Context } from "uix/routing/context.ts";
import { User } from "common/models/User.ts";
import { quizzes } from "../SaveQuiz.ts";

import * as argon2 from "jsr:@felix/argon2";
import { UsernameTakenError, WeakPasswordError, InvalidPasswordRepeatError, InvalidPasswordOrUsernameError } from "common/models/errors/accountErrors.ts";

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
		throw new InvalidPasswordOrUsernameError();
	}	

	//wrong password for user
	if (!await argon2.verify(users[username].password, password)) {
		throw new InvalidPasswordOrUsernameError();
	}

	console.log(`Logging in user ${username}`);


	//if login successful, setting session
	const session = await Context.getPrivateData(datex.meta.caller);
	session.userId = username;

	const userQuizzes = Object.values(quizzes).filter(quiz => quiz.accountId === username);

	if (userQuizzes.length === 0) {
		console.log("User has no Quizzes yet")
	}
	else {
		console.log("User has", userQuizzes.length, " Quizzes yet")
	}
	return true;
}


//Signup
export async function userSignUp(username: string, password: string, passwordRepeat : string)  {

	//wrong password for existing user
	if (!isValidPassword(password)) {
		throw new WeakPasswordError();
	}

	//repeated and initial password don't match
	if(!(password === passwordRepeat)) {
		throw new InvalidPasswordRepeatError();
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
	});
	console.log("Registering new user successful:", username);

	//if signup successful, setting session
	const session = await Context.getPrivateData(datex.meta.caller);
	session.userId = username;
	return true;
	}
}

//Password validation
function isValidPassword (password: string) : boolean {
	const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
	return regex.test(password);
}
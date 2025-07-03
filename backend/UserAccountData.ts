import { Context } from "uix/routing/context.ts";
import { User } from "../common/userCredentials.ts";

import * as argon2 from "jsr:@felix/argon2";
import { provideRedirect } from "uix/providers/common.tsx";
import { UsernameTakenError, WeakPasswordError } from "common/models/errors/accountErrors.ts";

export const users = eternal ?? $({} as Record<string, User>);

declare global {
	interface PrivateData {
		userId?: string
	}
};

//Login
export async function authenticate(ctx: Context) {

	console.log("LOGGING ALLE USER users:", users);

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
	return provideRedirect("/");//sollte irgendwann auf Account Startseite weiterleiten
}


//Signup
export async function register(username: string, password: string) {

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
		quizzes: [] // oder mit {}
	});
	console.log("Registering new user successful:", username);

	//if signup successful, setting session
	const session = await Context.getPrivateData(datex.meta);
	session.userId = username;
	return true; //sollte irgendwann auf Account Startseite weiterleiten
	}

}

//Password validation
function isValidPassword (password: string) : boolean {
	const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
	return regex.test(password);
}

//more logging
console.log("LOGGING ALLE USER users:", users);
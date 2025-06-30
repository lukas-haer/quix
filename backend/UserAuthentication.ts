import { Context } from "uix/routing/context.ts";
import { User } from "../common/userCredentials.ts";

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
	for (const quiz in users[user].quizzes) {
		console.log("-----------ALL Quizzes of user: ----------------", user)
		console.log("");
		console.log("Quiz ID:", quiz)
		console.log("Quiz Title:", users[user].quizzes[quiz].title);
		console.log("Quiz Description:", users[user].quizzes[quiz].description);
		console.log("Quiz Questions:", users[user].quizzes[quiz].questions);
		console.log("");
		console.log("----------------------------------------------------------");
	}
	console.log("users:", users);
	console.log("userObj:", users[user]);
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
		quizzes: [] // oder mit {}
	});
	console.log("Registering new user successful:", user);

	//if signup successful, setting session
	const session = await ctx.getPrivateData();
	session.userId = user;
	return provideRedirect("/account");//sollte irgendwann auf Account Startseite weiterleiten
	}
}

//Password validation
function PasswordIsValid (password: string) : boolean {
	const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
	return regex.test(password);
}
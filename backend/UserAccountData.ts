import { Context } from "uix/routing/context.ts";
import { User } from "../common/userCredentials.ts";

import * as argon2 from "jsr:@felix/argon2";
import { provideRedirect } from "uix/providers/common.tsx";

//export const users = $({} as Record<string, User>);
export const users = eternal ?? $({} as Record<string, User>);

declare global {
	interface PrivateData {
		userId?: string
	}
};

//Login
export async function authenticate(ctx: Context) {
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
	return provideRedirect("/");
}


//Signup
export async function register(ctx: Context) {
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
	});
	console.log("Registering new user successful:", user);

	//if signup successful, setting session
	const session = await ctx.getPrivateData();
	session.userId = user;
	return provideRedirect("/");
	}

}

//Password validation
function PasswordIsValid (password: string) : boolean {

	const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
	return regex.test(password);
}
import { Context } from "uix/routing/context.ts";
import { User } from "../common/userCredentials.ts";

import * as argon2 from "jsr:@felix/argon2";
import { provideRedirect } from "uix/providers/common.tsx";

export const users = $({} as Record<string, User>);

declare global {
	interface PrivateData {
		userId?: string
	}
};

//Login
export async function authenticate(ctx: Context) {
	const data = await ctx.request.formData();
	const user = data.get("user") as string;
	const password = data.get("password") as string;

	if (!(user in users)) {
		return provideRedirect("/login?error=user_not_found");
	}

	if (!await argon2.verify(users[user].password, password)) {
		return provideRedirect("/login?error=invalid_password");
	}

	console.log(`Logging in user ${user}`);

	const session = await ctx.getPrivateData();
	session.userId = user;
	return provideRedirect("/");
}


//Signup
export async function register(ctx: Context) {
	const data = await ctx.request.formData();
	const user = data.get("user") as string;
	const password = data.get("password") as string;


	if (!PasswordIsValid(password)) {
		return provideRedirect("/signup?error=invalid_password");
	}

	if (user in users) {
		return provideRedirect("/signup?error=user_already_exists");
	}
	
	console.log(`Registering user ${user}`);

	if (!(user in users) && PasswordIsValid(password)) {
	users[user] = User({
		id: user,
		password: await argon2.hash(password),
	});
	console.log("Registering new user successful:", user);

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
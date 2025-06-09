import { Context } from "uix/routing/context.ts";
import { User } from "common/user.ts";

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
		console.log(`Registering user ${user}`);
		users[user] = User({
			id: user,
			password: await argon2.hash(password),
		});
		console.log("Registering new user successful:", user)

	}

	if (!await argon2.verify(users[user].password, password)) {
		return provideRedirect("/auth?error=invalid_password");
		//return ctx.navigate("/auth?error=invalid_password");

	}

	console.log(`Logging in user ${user}`);

	const session = await ctx.getPrivateData();
	session.userId = user;

	return provideRedirect("/");
}



// Logout
export async function logout(ctx: Context) {
	const session = await ctx.getPrivateData()
	session.userId = undefined
	return provideRedirect("/auth")
}

// User-Getter
export async function getCurrentUser(ctx: Context) {
	const session = await ctx.getPrivateData()
	return session.userId ? users[session.userId] : null
}
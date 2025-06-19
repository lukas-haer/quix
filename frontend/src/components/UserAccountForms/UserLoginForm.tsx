import { authenticate } from "backend/UserAccountData.ts";
import { Context } from "uix/routing/context.ts";

export function userLogin (ctx: Context) {
	const url = new URL(ctx.request.url);
	const error = url.searchParams.get("error");

	return <form action={authenticate} method="post">
		<h2>Login</h2>
		<input type="text" name="user" placeholder="Enter your Name" required />
		<input type="password" name="password" placeholder="Password" required />
		{error === "user_not_found" && <p style={errorStyle}>No user with this name exists</p>}
		{error === "invalid_password" && <p style={errorStyle}>Wrong password for this user name</p>}
		<button type="submit">Login</button>
		<p><a href="/signup">Don't have an account yet? Sign up here</a></p>
	</form>
}

const errorStyle = {
	color: "red",
	fontSize: "0.9rem",
	marginTop: "0.2rem",
};
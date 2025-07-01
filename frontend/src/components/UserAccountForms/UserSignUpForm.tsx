import { userSignUp } from "backend/UserAccounts/UserAuthentication.ts";
import { Context } from "uix/routing/context.ts";


/**
 * @param ctx context of the request, for registration
 * @returns references registration function, hint about password requirements, error if user already exists or invalid password
 */
export function userSignUpForm (ctx: Context) {
	const url = new URL(ctx.request.url);
	const error = url.searchParams.get("error");

	return <form action={userSignUp} method="post">
			<h2>Sign Up</h2>
			<input type="text" name="user" placeholder="Username" required />
			<input type="password" name="password" placeholder="Password" required/>
			<p style={hintStyle}>Password needs to contain at least 8 characters, 1 number, 1 special sign</p>
			{error === "user_already_exists" && <p style={errorStyle}>A user with this name already exists</p>}
			{error === "invalid_password" && (
				<p style={errorStyle}>
						password needs to be at least characters long and contain a number and a special character
				</p>)}
			<button type="submit">Sign Up</button>
			<p><a href="/login">Already have an account? Log in here</a></p>
		</form>
}

const errorStyle = {
	color: "red",
	fontSize: "0.9rem",
	marginTop: "0.2rem",
};

const hintStyle = {
	color: "#555",
	fontSize: "0.8rem",
	marginTop: "0.2rem",
};
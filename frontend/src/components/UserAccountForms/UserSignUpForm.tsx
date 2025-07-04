import { userSignUp } from "backend/UserAccounts/UserAuthentication.ts";
import { Context } from "uix/routing/context.ts";
import { failureSnackbarMessage, Snackbar } from "frontend/src/components/utils/snackbar/Snackbar.tsx";
import { UsernameTakenError, WeakPasswordError } from "common/models/errors/accountErrors.ts";


/**
 * @param ctx context of the request, for registration
 * @returns references registration function, hint about password requirements, error if user already exists or invalid password
 */
export function userSignUpForm (ctx: Context) {
	//const url = new URL(ctx.request.url);

	const username = $("");
	const password = $("");

	async function register() {
		try {
			await userSignUp(username.val, password.val)
			redirect(`/account/${username.val}`)
		} catch (error) {
			console.error("Error (UserSignUpForm/register): ", error);		
			
			if (String(error).includes("UsernameTakenError")) {
				failureSnackbarMessage("Username taken", "A user with this name already exists.");
			} else if (String(error).includes("WeakPasswordError")) {
				failureSnackbarMessage("Weak Password", "Password is not strong enough. It must be at least 8 characters long, contain a number, and a special character.");
			} else {
				failureSnackbarMessage("Registration failed", "Registration failed. Please try again.");
			}
		}
	}

	return (
		<main>
			<Snackbar></Snackbar>
			<h2>Sign Up for a new Account</h2>
			<input type="text" name="username" placeholder="Username" value={username} required />
			<input type="password" name="password" placeholder="Password" value={password} required/>
			<p style={hintStyle}>Password needs to contain at least 8 characters, 1 number, 1 special sign</p>
			<button type="submit" onclick={register}>Sign Up</button>
			<p><a href="/login">Already have an account? Log in here</a></p>
		</main>
	)
	
}

const hintStyle = {
	color: "#555",
	fontSize: "0.8rem",
	marginTop: "0.2rem",
};
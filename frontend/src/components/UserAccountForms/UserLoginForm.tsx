import { userLogin } from "backend/UserAccounts/UserAuthentication.ts";
import { Context } from "uix/routing/context.ts";
import { failureSnackbarMessage, Snackbar } from "frontend/src/components/utils/snackbar/Snackbar.tsx";
/**
 * 
 * @param ctx context of the request, for authentication
 * @returns references authentication function, errors if no existing user or wrong password
 */
export function userLoginForm (ctx: Context) {
	//const url = new URL(ctx.request.url);

	const username = $("");
	const password = $("");

	async function authenticate() {
		try {
			await userLogin(username.val, password.val)
			redirect(`/account/${username.val}`)
		} catch(error) {
			console.error("Error (UserLoginForm/authenticate): ", error);	
			if (String(error).includes("UserNotFoundError")) {
				failureSnackbarMessage("User not Found", "No user with this name exists");
			} else if (String(error).includes("InvalidPasswordError")) {
				failureSnackbarMessage("Invalid Password", "Wrong password for this user name");
			} else {
				failureSnackbarMessage("Registration failed", "Registration failed. Please try again.");
			}

		}
	}

	return (
			<main>
				<Snackbar></Snackbar>
				<h2>Log into your Account</h2>
				<input type="text" name="username" placeholder="Username" value={username} required />
				<input type="password" name="password" placeholder="Password" value={password} required/>
				<button type="submit" onclick={authenticate}>Log in</button>
				<p><a href="/signup">Don't have an account yet? Sign up here</a></p>
			</main>
		)

}
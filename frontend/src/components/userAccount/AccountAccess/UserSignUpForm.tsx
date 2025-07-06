import { userSignUp } from "backend/UserAccounts/UserAuthentication.ts";
import { failureSnackbarMessage, Snackbar } from "frontend/src/components/utils/snackbar/Snackbar.tsx";
import { Component, template, style } from "uix/components/Component.ts";

@style ("./AccountAccess.css")
@template (() => {
	
	const username = $("");
	const password = $("");
	const passwordRepeat = $("");

	async function register() {
		try {
			await userSignUp(username.val, password.val, passwordRepeat.val)
			redirect(`/account/${username.val}`)
		} catch (error) {
			console.error("Error (UserSignUpForm/register): ", error);		
			
			if (String(error).includes("UsernameTakenError")) {
				failureSnackbarMessage("Username taken", "A user with this name already exists.");
			} else if (String(error).includes("WeakPasswordError")) {
				failureSnackbarMessage("Weak Password", "Password is not strong enough. It must be at least 8 characters long, contain a number, and a special character.");
			} else if (String(error).includes("InvalidPasswordRepeatError")) {
				failureSnackbarMessage("Passwords don't match", "Repeated Password doesn't match the initial Password");
			} else {
				failureSnackbarMessage("Registration failed", "Registration failed. Please try again.");
			}
		}
	}
	return (			
		<body id="signup-body">
			<Snackbar/>
			<section id="signup-section">
				<a href="/"><button type="button" class="home-button">Back to home menu</button></a>
				<h1>SIGN UP TO QUIX</h1>
				<div class="form-container" id="signup-form">
					<input type="text" name="username" placeholder="Username" value={username} required />
					<input type="password" name="password" placeholder="Password" value={password} required/>
					<input type="password" name="passwordRepeat" placeholder="Repeat Password" value={passwordRepeat} required/>
					<button type="submit" class="button" onclick={register}>Sign Up</button>
				</div>
				<div class="login-text">
					<a href="/login">Already have an account? Log in here</a>
				</div>
			</section>
		</body>
	)
})


export class UserSignUpForm extends Component {}
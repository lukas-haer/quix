import { userLogin } from "backend/UserAccounts/UserAuthentication.ts";
import { failureSnackbarMessage, Snackbar } from "frontend/src/components/utils/snackbar/Snackbar.tsx";
import { Component, template, style } from "uix/components/Component.ts";

@style ("./AccountAccess.css")
@template (() => {
	
	
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
			<body id="login-body">
				<Snackbar/>	
				<section id="login-section">
					<a href="/"><button type="button" class="home-button">Back to home menu</button></a>
					<h1>LOG INTO YOUR ACCOUNT</h1>
					<div class="form-container" id="login-form">
						<input type="text" name="username" placeholder="Username" value={username} required />
						<input type="password" name="password" placeholder="Password" value={password} required/>
						<button type="submit" class="button" onclick={authenticate}>Log in</button>
					</div>
					<div class="signup-text">
						<p><a href="/signup">Don't have an account yet? Sign up here</a></p>
					</div>
				</section>
			</body>
		)

})

export class UserLoginForm extends Component {}

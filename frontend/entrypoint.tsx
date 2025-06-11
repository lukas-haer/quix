import type { Entrypoint } from "uix/providers/entrypoints.ts"
//import { CreateQuiz } from './src/components/gamecreation/createQuiz/CreateQuiz.tsx';
import { authenticate } from "backend/data.ts";


export default {
		"/": <div>
			<h1>Welcome to QUIX!</h1>
			<a href="/auth"><button type="button" id="login-btn">Login</button></a>
		</div>,


	"/auth": (ctx) => {
		const url = new URL(ctx.request.url);
		const error = url.searchParams.get("error");
		return <form action={authenticate} method="post">
					<h2>Login / Sign Up</h2>
					<div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
						<input type="text" name="user" placeholder="enter your name" required />
						
						<div style={{ position: "relative" }}>
							<input type="password" name="password" placeholder="enter your password" required />
							{error === "invalid_password" && (
								<p style={{color: "red", fontSize: "0.75rem", position: "absolute", top: "100%", left: 0, margin: 0}}>Wrong Password</p>
							)}
						</div>
						<button type="submit">Authenticate</button>
					</div>
					</form>
	}
	//"/create-quiz": <CreateQuiz/>,
} satisfies Entrypoint;

//todo: 
// Inhalte an Nutzer binden, 
// Unterschiedliche Formulare für Login und Registrierung, 
// bei Registierung wenn Nutzer schon vorhanden Fehler, 
// bei Login wenn Nutzer noch nicht vorhanden Fehler
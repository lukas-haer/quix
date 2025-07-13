import { provideRedirect } from "uix/providers/common.tsx";
import { Context } from "uix/routing/context.ts";
import { users } from "backend/UserAccounts/UserAuthentication.ts";
import { Quiz } from "common/models/Quiz.ts";
import { quizzes } from "backend/SaveQuiz.ts";
import { Component, template } from "uix/components/Component.ts";
import { deleteQuiz } from "../../gamecreation/createQuiz/CreateQuiz.tsx";

@template(function ({ userId }) {

	const currentUser = userId;
	console.log("Log Accountpage current user: ", currentUser);

	if (!users[currentUser] ) {
		throw new Error("User needs to be logged in to view his Account Page")
	}

	//get quizzes to render
	const userQuizzes = $(Object.values(quizzes).filter(quiz => quiz.accountId === currentUser));

	//modal for delete Quiz button
	const showModal = $(false);

	return (
		<body>
			<button class="logout-button" type="button" onclick={() => redirect("/")}>Go to home</button>
			<h1>{ currentUser }s Quizzes</h1>
			{
				userQuizzes.length === 0 
			?(
				<div> 
					<div class="no-quizzes-message">You don't have any Quizzes for now</div> 
					<div class="quiz-section-divider"></div>
					<div class="quiz-container">
						<div class="create-card">
							<h3>Create your First Quiz</h3>
							<a href="/create"><button class="button" type="button" id="createQuiz-btn">Create</button></a>
						</div>
					</div>
				</div>
			): (
				<div>
					<div class="quiz-section-divider"></div>
					<div class="quiz-container">
						{userQuizzes.map((quiz: Quiz) => (
							<div class="quiz-card">
								<h3>{ quiz.title }</h3>
								<p>{ quiz.description }</p>
								<div>
									<button class="button" type="button">Edit</button>
									<a href={`/host/${quiz.quizId}`}><button class="button" type="button">Host</button></a>
									<button class="button delete-button" type="button" onclick={()=> (showModal.val = true)}>Delete</button>
									{showModal.val && (
										<div class="modal-overlay">
											<div class="modal">
												<h3>Are you sure you want to delete your Quiz "{quiz.title}"</h3>
												<div class="modal-btn">
													<button class="close-btn" type="button" onclick={() => { showModal.val = false;}}>Cancel</button>
													<button type="button" class="confirm-btn" onclick={() => {deleteQuiz(quiz.quizId, currentUser); showModal.val = false; redirect(`/account/${userId}`)}}>
														Delete Quiz</button>
												</div>
											</div>
										</div>
									)}
								</div>
							</div>
						))}
						<div class="create-card">
							<h3>Create another Quiz</h3>
							<a href="/create"><button class="button" type="button" id="createQuiz-btn">Create</button></a>
						</div>	
					</div>			
				</div>
			)}
		</body>
	)
})

export class AccountPage extends Component<{ userId : string }> {}
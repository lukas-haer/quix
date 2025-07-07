import { Component, template } from "uix/components/Component.ts";
import { SnackbarMessage } from "./messages/SnackbarMessage.tsx";

/**
 * This functions spawns a Snackbar-Message / Toast in the bottom right corner.
 * It is success-themed.
 * @param title Bold title at the top of the toast
 * @param text Text content of the toast
 * @param durationInMs Duration in miliseconds of how long the toast is shown. Defaults to 5_000ms (5 seconds)
 */
export function successSnackbarMessage(title: string, text: string, durationInMs?: number) { showSnackbarMessage("success",title,text,durationInMs)}

/**
 * This functions spawns a Snackbar-Message / Toast in the bottom right corner.
 * It is failure-themed.
 * @param title Bold title at the top of the toast
 * @param text Text content of the toast
 * @param durationInMs Duration in miliseconds of how long the toast is shown. Defaults to 5_000ms (5 seconds)
 */
export function failureSnackbarMessage(title: string, text: string, durationInMs?: number) { showSnackbarMessage("failure",title,text,durationInMs)}

/**
 * Spawns the actual Message and is not meant to be called directly!
 * @param type success or failure
 * @param title Bold title at the top of the toast
 * @param text Text content of the toast
 * @param durationInMs Duration in miliseconds of how long the toast is shown. Defaults to 5_000ms (5 seconds)
 */
function showSnackbarMessage (
	type: "success" | "failure",
	title: string,
    text: string,
    durationInMs?: number
) {
	if (!durationInMs) {
		durationInMs = 10_000 // Default duration of 10 seconds
	}

    /* Here we unfortunatly have to use good old JS getElementById and appendChild, because when using a reactive array
    removing a SnackbarMessage triggers a rerender of the array and with that retriggers the entrance animation. 
    An attempt with a reactive array can be found below*/
    const newMessage = <SnackbarMessage type={type} title={title} text={text} durationInMs={durationInMs} />;
    const snackbar = document.getElementById("snackbar");
    snackbar?.appendChild(newMessage);

	//Delete the message after set duration
    setTimeout(() => {
        snackbar?.removeChild(newMessage);
    }, durationInMs + 500);
}

@template(() => {
    return (
        <div class="snackbar" id="snackbar">
        </div>
    );
})
export class Snackbar extends Component {}

/* Currently unsupported, may use later

const messages = $([] as Message[]);

function showSnackbarMessage(title:string, text: string, duration:number) {
	const id = crypto.randomUUID()
	const newMessage: Message = {
		id: id,
		title: title,
		text: text,
		duration: duration
	}
	
	messages.push(newMessage)

	setTimeout(() => {
		const index = messages.findIndex((msg) => msg.id === id)
		messages.splice(index,1)
	},duration)
}


HTML-Code:
            {messages.map((msg: Message) => {
                return (
                    <SnackbarMessage
						type={msg.type}
                        title={msg.title}
                        text={msg.text}
                        durationInMs={msg.durationInMs}
                    />
                );
            })}
	*/

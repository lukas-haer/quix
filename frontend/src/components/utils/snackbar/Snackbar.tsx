import { Component, template } from "uix/components/Component.ts";
import { SnackbarMessage } from "frontend/src/components/utils/snackbar/messages/SnackbarMessage.tsx";

type Message = {
    id: string;
	type: "success" | "failure";
    title: string;
    text: string;
    duration: number;
};

const messages = $([] as Message[]);

/* Currently unsupported, may use later
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
	*/

export function showSnackbarMessage(
	type: "success" | "failure",
    title: string,
    text: string,
    duration: number
) {	
    const newMessage = (
        <SnackbarMessage type={type} title={title} text={text} duration={duration} />
    );
    const snackbar = document.getElementById("snackbar");
	
    snackbar?.appendChild(newMessage);

    setTimeout(() => {
        snackbar?.removeChild(newMessage);
    }, duration + 500);
}

@template(() => {
    return (
        <div class="snackbar" id="snackbar">
            {messages.map((msg: Message) => {
                return (
                    <SnackbarMessage
						type={msg.type}
                        title={msg.title}
                        text={msg.text}
                        duration={msg.duration}
                    />
                );
            })}
        </div>
    );
})
export class Snackbar extends Component {}

import { Component, template } from "uix/components/Component.ts";

@template((props) => {
	//Default styling
    const styleClasses = $("snackbar-message");

	//Entrance animation
    setTimeout(() => {
        styleClasses.val = "snackbar-message show";
    }, 200);

	//Exit animation
    setTimeout(() => {
        styleClasses.val = "snackbar-message fade-out";
    }, props.durationInMs);

	//Diffent color depending on the type
    let bgColor = "#8e0000";
    let imgSource = 'frontend/public/img/failure.svg'
    if (props.type === "success") {
        bgColor = "#4caf50";
        imgSource = 'frontend/public/img/success.svg'
    }

    return (
        <div class={styleClasses} role="alert">
            <div
                class="snackbar-message-timer"
                style={{
                    "animation-duration": `${props.durationInMs}ms`,
                    "background-color": bgColor,
                }}
            />
            <div class="snackbar-body">   
                <div>
                    <div class="snackbar-message-title">{props.title}</div>
                    <div class="snackbar-message-text">{props.text}</div>
                </div>
                <img class="snackbar-icon" src={imgSource}/>
            </div>            

        </div>
    );
})

export class SnackbarMessage extends Component<{
    type: "success" | "failure";
    title: string;
    text: string;
    durationInMs: number;
}> {}

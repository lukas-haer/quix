import { Component, template } from "uix/components/Component.ts";

@template((props) => {
    const styleClasses = $("snackbar-message");

    setTimeout(() => {
        styleClasses.val = "snackbar-message show";
    }, 100);

    setTimeout(() => {
        styleClasses.val = "snackbar-message fade-out";
    }, props.duration);

    let bgColor = "#8e0000";

    if (props.type === "success") bgColor = "#4caf50";

    return (
        <div class={styleClasses} role="alert">
            <div
                class="snackbar-message-timer"
                style={{
                    "animation-duration": `${props.duration}ms`,
                    "background-color": bgColor,
                }}
            ></div>

            <div class="snackbar-message-title">{props.title}</div>
            <div class="snackbar-message-text">{props.text}</div>
        </div>
    );
})
export class SnackbarMessage extends Component<{
    type: "success" | "failure";
    title: string;
    text: string;
    duration: number;
}> {}

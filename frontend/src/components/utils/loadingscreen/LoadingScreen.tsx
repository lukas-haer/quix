import { Component, template } from 'uix/components/Component.ts';
import { UIX } from "uix"

@template((props) => {

    UIX.Theme.useTheme("uix-light-plain")

	const text = $("Loading...")
	if (props.text) {
		text.val = props.text;
	}

    return (
        <section class="loading-screen">
            <div class="spinner"></div>
            <div class="loading-text">{text.val}</div>
        </section>
    );
})
export class LoadingScreen extends Component<{text?: string}> {}

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
    <div class="loading-text">Loading...</div>
    <div class="shape rectangle"></div>
    <div class="shape circle"></div>
    <div class="shape triangle"></div>
    <div class="shape star"></div>
        </section>
    );
})
export class LoadingScreen extends Component<{text?: string}> {}

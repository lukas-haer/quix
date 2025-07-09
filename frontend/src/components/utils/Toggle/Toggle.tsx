import { Component, template } from 'uix/components/Component.ts';

@template(() => {
	return (
		<>
		<label class="switch">
			<input type="checkbox" />
			<span class="slider round"></span>
		</label>
		</>
	);
})
export class Toggle extends Component {}

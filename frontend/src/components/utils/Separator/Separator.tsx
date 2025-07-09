import { Component, template } from 'uix/components/Component.ts';

type SeparatorProps = {
	text: string;
}

@template(({ text }: SeparatorProps) => {
	return (
		<div class="separator">
			<span>{text}</span>
		</div>
	);
})
export class Separator extends Component<SeparatorProps> {}
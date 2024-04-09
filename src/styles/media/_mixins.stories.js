import './_mixins.stories.scss';

import { ButtonComponent } from '../../client/components/ui/Button/ButtonComponent';

const story = {
	title: 'Toolbox/Media query mixins',
};
export default story;

export const ExampleMediaMixinsQueryLarge = {
	name: 'Example - Media mixins - query large',

	render: () => (
		<div className="buttonsContainer">
			<ButtonComponent label="Bouton 1"/>
			<ButtonComponent label="Bouton 2"/>
			<ButtonComponent label="Bouton 3"/>
		</div>
	),
};

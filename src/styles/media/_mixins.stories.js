import './_mixins.stories.scss';

import { ButtonComponent } from '../../client/components/ui/Button/ButtonComponent';

export default {
	title: 'Toolbox/Media query mixins',
};

export const ExampleMediaMixinsQueryLarge = {
	name: 'Example - Media mixins - query large',

	render: () => (
		<div className="buttonsContainer">
			<ButtonComponent label="Bouton 1" />
			<ButtonComponent label="Bouton 2" />
			<ButtonComponent label="Bouton 3" />
		</div>
	),
};

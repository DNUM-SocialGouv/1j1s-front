import type { Meta, StoryObj } from '@storybook/react';

import { LoadingButton } from './LoadingButton';

const meta: Meta<typeof LoadingButton> = {
	argTypes: {
		className: { description: 'Pour customiser le style de l’élément' },
		label: { description: 'Texte à afficher dans le bouton' },
	},
	args: {
		className: 'some-className',
		label: 'Envoi en cours',
	},
	component: LoadingButton,
	title: 'Components/Button/LoadingButton',
};

export default meta;
type Story = StoryObj<typeof LoadingButton>;

export const Exemple: Story = {
	args: {},
};

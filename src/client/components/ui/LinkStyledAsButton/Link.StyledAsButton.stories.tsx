import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '../Icon/Icon';
import { LinkStyledAsButton } from './LinkStyledAsButton';

const meta: Meta<typeof LinkStyledAsButton> = {
	argTypes: {
		icon: {
			// Gestion "manuelle" d'une prop qui accepte un composant React
			mapping: {
				'angle-left': <Icon name="angle-left" />,
				'angle-right': <Icon name="angle-right" />,
				'magnifying-glass': <Icon name="magnifying-glass" />,
			},
			options: ['magnifying-glass', 'angle-left', 'angle-right'],
		},
	},
	args:{
		children:'Cliquez ici',
		href:'https://www.1jeune1solution.gouv.fr/',
		prefetch:true,
	},
	component: LinkStyledAsButton,
	title: 'Components/LinkStyledAsButton',
};
export default meta;
type Story = StoryObj<typeof LinkStyledAsButton>;

export const asPrimaryButton: Story = {
	args: {
		appearance: 'asPrimaryButton',
	},
};

export const asSecondaryButton: Story = {
	args: {
		appearance: 'asSecondaryButton',
	},
};
export const asTertiaryButton: Story = {
	args: {
		appearance: 'asTertiaryButton',
	},
};
export const asQuaternayButton: Story = {
	args: {
		appearance: 'asQuaternayButton',
	},
};


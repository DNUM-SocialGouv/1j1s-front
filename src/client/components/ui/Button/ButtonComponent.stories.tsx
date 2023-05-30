import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '../Icon/Icon';
import { ButtonComponent } from './ButtonComponent';

const meta: Meta<typeof ButtonComponent> = {
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
	args: {
		disabled: false,
		label: 'Cliquez ici',
	},
	component: ButtonComponent,
	title: 'Components/ButtonComponent',
};

export default meta;
type Story = StoryObj<typeof ButtonComponent>;

export const Primary: Story = {
	args: {
		appearance: 'primary',
	},
};

export const Secondary: Story = {
	args: {
		appearance: 'secondary',
	},
};

export const Tertiary: Story = {
	args: {
		appearance: 'tertiary',
	},
};

export const Quaternary: Story = {
	args: {
		appearance: 'quaternary',
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};

export const WithIcon: Story = {
	args: {
		icon: 'magnifying-glass',
		iconPosition: 'left',
		label: 'Rechercher',
	},
};

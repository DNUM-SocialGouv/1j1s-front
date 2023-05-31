import type { Meta, StoryObj } from '@storybook/react';

import { LinkCard } from './LinkCard';

const meta: Meta<typeof LinkCard> = {
	args: {
		children: 'Contenu de la carte',
		imageUrl: 'https://i0.wp.com/caravanedesdixmots.com/wp-content/uploads/2021/05/placeholder.png',
		link: 'https://www.google.com',
		linkLabel: 'Voir plus',
		title: 'Cartes Homepage',
		titleAs: 'h2',
	},
	component: LinkCard,
	title: 'Components/LinkCard',
};

export default meta;
type Story = StoryObj<typeof LinkCard>;

export const Default: Story = {
	args: {

	},
};

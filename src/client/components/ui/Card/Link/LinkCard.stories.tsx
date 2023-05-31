import type { Meta, StoryObj } from '@storybook/react';

import { LinkCard } from './LinkCard';

const meta: Meta<typeof LinkCard> = {
	args: {
		imageUrl: '/images/créer-son-cv.webp',
		link: 'https://www.google.com',
		linkLabel: 'Voir plus',
		title: 'Titre de la carte',
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

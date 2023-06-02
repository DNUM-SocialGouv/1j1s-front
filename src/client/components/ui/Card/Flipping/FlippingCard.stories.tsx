import type { Meta, StoryObj } from '@storybook/react';

import { FlippingCard } from './FlippingCard';

const meta: Meta<typeof FlippingCard> = {
	args: {
		category: 'Accompagnement',
		flippingCardContent: 'Contenu de la carte',
		imageUrl: 'https://i0.wp.com/caravanedesdixmots.com/wp-content/uploads/2021/05/placeholder.png',
		link: 'https://www.google.com',
		title: 'Cartes_Services_Jeunes',
		titleAs: 'h2',
	},
	component: FlippingCard,
	title: 'Components/Cards/FlippingCard',
};

export default meta;
type Story = StoryObj<typeof FlippingCard>;

export const Default: Story = {
	args: {

	},
};

import type { Meta, StoryObj } from '@storybook/react';

import { LinkCard } from './LinkCard';

const meta: Meta<typeof LinkCard> = {
	args: {
		children: <p>Retrouvez les conseils, outils et structures d’accompagnement pour vous aider à entreprendre</p>,
		imageUrl: 'https://i0.wp.com/caravanedesdixmots.com/wp-content/uploads/2021/05/placeholder.png',
		link: 'https://www.1jeune1solution.gouv.fr/entreprendre',
		linkLabel: 'En savoir plus',
		title: 'Entreprendre : financements, aides et accompagnement',
		titleAs: 'h2',
	},
	component: LinkCard,
	title: 'Components/Cards/LinkCard',
};

export default meta;
type Story = StoryObj<typeof LinkCard>;

export const Default: Story = {
	args: {

	},
};

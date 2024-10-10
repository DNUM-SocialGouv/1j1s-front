import type { Meta, StoryObj } from '@storybook/react';

import { PresentationCard } from './PresentationCard';

const meta: Meta<typeof PresentationCard> = {
	args: {
		children: 'Découvrez un argument supplémentaire à avancer pour vous faire embaucher',
		imageFit: 'cover',
		imageSrc: '/images/accompagnement.webp',
		titleHeadingTag: 'h2',
		titleLabel: 'Une aide exceptionnelle pour l’apprentissage : l’atout qu’il vous faut pour vos candidatures !',
	},
	component: PresentationCard,
	title: 'Components/Cards/PresentationCard',
};

export default meta;
type Story = StoryObj<typeof PresentationCard>;
export const Default: Story = {
	args: {},
};

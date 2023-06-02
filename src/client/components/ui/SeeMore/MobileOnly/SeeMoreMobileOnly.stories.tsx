import type { Meta, StoryObj } from '@storybook/react';

import SeeMoreMobileOnly from './SeeMoreMobileOnly';

const meta: Meta<typeof SeeMoreMobileOnly> = {
	component: SeeMoreMobileOnly,
	title: 'Components/SeeMoreItem/SeeMoreMobileOnly',
};

export default meta;
type Story = StoryObj<typeof SeeMoreMobileOnly>;

const items = [
	<p key={1}> Je suis visible ! </p>,
	<p key={2}> Moi aussi, je suis visible ! </p>,
	<p key={3}> Je suis caché en mobile uniquement ! </p>,
	<p key={4}> Moi aussi, je suis caché en mobile uniquement ! ! </p>,
];

export const Example: Story = {
	args: {
		children: items,
		itemList: items,
		numberOfVisibleItems: 2,
		seeLessAriaLabel: 'Voir moins de texte',
		seeMoreAriaLabel: 'Voir plus de texte',
	},
};

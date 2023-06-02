import type { Meta, StoryObj } from '@storybook/react';

import SeeMoreMobileOnly from './SeeMoreMobileOnly';

const meta: Meta<typeof SeeMoreMobileOnly> = {
	component: SeeMoreMobileOnly,
	title: 'Components/SeeMoreItem/SeeMoreMobileOnly',
};

export default meta;
type Story = StoryObj<typeof SeeMoreMobileOnly>;

export const Example: Story = {
	args: {
		itemList: [
			<p key={1}> Je suis visible ! </p>,
			<p key={2}> Moi aussi, je suis visible ! </p>,
			<p key={3}> Je suis caché en mobile uniquement ! </p>,
			<p key={4}> Moi aussi, je suis caché en mobile uniquement ! ! </p>,
		],
		numberOfVisibleItems: 2,
		seeLessAriaLabel: 'Voir moins de texte',
		seeMoreAriaLabel: 'Voir plus de texte',
	},
};

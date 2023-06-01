import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import SeeMoreItemList from './SeeMoreItemList';

const meta: Meta<typeof SeeMoreItemList> = {
	component: SeeMoreItemList,
	title: 'Components/SeeMoreItemList',
};

export default meta;
type Story = StoryObj<typeof SeeMoreItemList>;

export const Example: Story = {
	args: {
		itemList: [
			<p key={1}> Je suis visible ! </p>,
			<p key={2}> Moi aussi, je suis visible ! </p>,
			<p key={3}> Je suis caché ! </p>,
			<p key={4}> Moi aussi, je suis caché ! </p>,
		],
		numberOfVisibleItems: 2,
		seeLessAriaLabel: 'Voir moins de texte',
		seeMoreAriaLabel: 'Voir plus de texte',
	},
};


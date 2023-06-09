import type { Meta, StoryObj } from '@storybook/react';

import { Carousel } from './Carousel';

const meta: Meta<typeof Carousel> = {
	component: Carousel,
	title: 'Components/Carousel',
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Example: Story = {
	args: {
		hideIndicators: true,
		imageList: [],
		imageListLabel: 'Ceci est une image',
		imagesSize: { height: 109, width:34 },
		
	},
};


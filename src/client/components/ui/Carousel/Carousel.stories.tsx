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
		imageList: [
			{
				alt: '',
				src: '/images/accompagnement.webp',
			},
			{
				alt: '',
				src: '/images/accompagnement.webp',
			},
			{
				alt: '',
				src: '/images/accompagnement.webp',
			},
		],
		imageListLabel: 'liste de photo d´illustration',
		imagesSize: { height: 109, width: 34 },
	},
};


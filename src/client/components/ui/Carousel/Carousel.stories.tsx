import type { Meta, StoryObj } from '@storybook/nextjs';

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
				src: 'https://picsum.photos/384/216?1',
			},
			{
				alt: '',
				src: 'https://picsum.photos/384/216?2',
			},
			{
				alt: '',
				src: 'https://picsum.photos/384/216?3',
			},
		],
		imagesSize: { height: 109, width: 34 },
		style: { aspectRatio: '16/9' },
	},
};


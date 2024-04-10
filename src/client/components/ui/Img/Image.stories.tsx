import { Meta, StoryObj } from '@storybook/react';

import { Image } from './Image';

const meta: Meta<typeof Image> = {
	component: Image,
	title: 'Components/Image',
};

export default meta;

type Story = StoryObj<typeof Image>;
export const exemple: Story = {
	args: {
		alt: '',
		height: 216,
		src: 'https://picsum.photos/384/216',
		width: 384,
	},
};

export const sourceInvalide: Story = {
	args: {
		alt: '',
		height: 216,
		src: '/invalid/image',
		width: 384,
	},
};

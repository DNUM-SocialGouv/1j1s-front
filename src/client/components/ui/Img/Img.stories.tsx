import { Meta, StoryObj } from '@storybook/react';

import { Img } from './Img';

const meta: Meta<typeof Img> = {
	component: Img,
	title: 'Components/Img',
};

export default meta;

type Story = StoryObj<typeof Img>;
export const exemple: Story = {
	args: {
		alt: '',
		height: 216,
		src: 'https://picsum.photos/384/216',
		width: 384,
	},
	render: (args) => (
		<Img {...args}/>
	),
};

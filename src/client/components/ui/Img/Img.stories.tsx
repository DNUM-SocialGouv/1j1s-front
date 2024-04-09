import { Meta, StoryObj } from '@storybook/react';

import { Img } from './Img';

const meta: Meta<typeof Img> = {
	component: Img,
	title: 'Components/Img',
};

export default meta;

type Story = StoryObj<typeof Img>;
export const exemple: Story = {
	args: { src: 'https://picsum.photos/200/300' },
	render: (args) => (
		<Img {...args}/>
	),
};

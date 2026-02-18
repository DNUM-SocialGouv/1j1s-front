import type { Meta, StoryObj } from '@storybook/react';

import { ModalComponent } from './ModalComponent';

const meta: Meta<typeof ModalComponent> = {
	component: ModalComponent,
	title: 'Components/ModalComponent',

};

export default meta;
type Story = StoryObj<typeof ModalComponent>;

export const Example: Story = {
	args: {
		closeLabel: '',
		closeTitle: '',
		isOpen: true,
		keepModalMounted: true,
	},
};

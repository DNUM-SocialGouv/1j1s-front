import type { Meta, StoryObj } from '@storybook/react';

import { ModaleSuccessSubmission } from './ModaleSuccessSubmission';

const meta: Meta<typeof ModaleSuccessSubmission> = {
	component: ModaleSuccessSubmission,
	title: 'Components/Form/ModaleSuccessSubmission',
};

export default meta;

type Story = StoryObj<typeof ModaleSuccessSubmission>;

export const Example: Story = {
	args: { isOpen: true, onClose: () => window.alert('action de fermeture de la modale') },
};

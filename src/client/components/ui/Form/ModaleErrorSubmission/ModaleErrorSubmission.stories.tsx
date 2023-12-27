import type { Meta, StoryObj } from '@storybook/react';

import { ModaleErrorSubmission } from './ModaleErrorSubmission';

const meta: Meta<typeof ModaleErrorSubmission> = {
	component: ModaleErrorSubmission,
	title: 'Components/Form/ModaleErrorSubmission',
};

export default meta;

type Story = StoryObj<typeof ModaleErrorSubmission>;

export const Example: Story = {
	args: { isOpen: true, onClose: () => window.alert('action de fermeture de la modale') },
};

export const ExampleWithChildren: Story = {
	args: { description: <div>Je suis une description</div>, isOpen: true, onClose: () => window.alert('action de fermeture de la modale')  },
};

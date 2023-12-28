import type { Meta, StoryObj } from '@storybook/react';

import { ModalErrorSubmission } from './ModalErrorSubmission';

const meta: Meta<typeof ModalErrorSubmission> = {
	component: ModalErrorSubmission,
	title: 'Components/Form/ModaleErrorSubmission',
};

export default meta;

type Story = StoryObj<typeof ModalErrorSubmission>;

export const Example: Story = {
	args: { isOpen: true, onClose: () => window.alert('action de fermeture de la modale') },
};

export const ExampleWithChildren: Story = {
	args: { description: <div>Je suis une description</div>, isOpen: true, onClose: () => window.alert('action de fermeture de la modale')  },
};

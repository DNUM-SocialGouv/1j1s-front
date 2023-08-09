import { Meta, StoryObj } from '@storybook/react';

import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { MétierService } from '~/client/services/métiers/métier.service';
import { createSuccess, Either } from '~/server/errors/either';
import { Métier } from '~/server/metiers/domain/métier';
import { aListeDeMetierLaBonneAlternance } from '~/server/metiers/domain/métier.fixture';

import { ComboboxMetiers } from '.';

const meta: Meta<typeof ComboboxMetiers> = {
	argTypes: {
		label: {
			type: 'string',
		},
	},
	args: {
		label: 'Domaine',
	},
	component: ComboboxMetiers,
	title: 'Components/Form/Combobox/ComboboxMetiers',
};

class MetierServiceStub extends MétierService {
	async rechercherMétier(query: string): Promise<Either<Métier[]>> {
		return new Promise((resolve) => setTimeout(() => resolve(createSuccess(
			aListeDeMetierLaBonneAlternance()
				.filter((metier: Métier) => (
					metier.label.toLowerCase().includes(query.toLowerCase()))),
		)), 1000));
	}
}

export default meta;
type Story = StoryObj<typeof ComboboxMetiers>;
export const exemple: Story = {
	args: {},
	render: ({ ...args }) => {
		return (
			<DependenciesProvider métierService={new MetierServiceStub()}>
				<ComboboxMetiers {...args} />
			</DependenciesProvider>
		);
	},
};

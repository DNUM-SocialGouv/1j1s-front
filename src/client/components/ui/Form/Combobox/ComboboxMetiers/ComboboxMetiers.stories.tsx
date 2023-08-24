import { Meta, StoryObj } from '@storybook/react';

import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { createSuccess, Either } from '~/server/errors/either';
import { aListeDeMetierLaBonneAlternance } from '~/server/metiers/domain/métier.fixture';

import { Metier } from '../../../../../../server/metiers/domain/metier';
import { MetierService } from '../../../../../services/metiers/metier.service';
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

class MetierServiceStub extends MetierService {
	async rechercherMetier(query: string): Promise<Either<Metier[]>> {
		return new Promise((resolve) => setTimeout(() => resolve(createSuccess(
			aListeDeMetierLaBonneAlternance()
				.filter((metier: Metier) => (
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
			<DependenciesProvider metierService={new MetierServiceStub()}>
				<ComboboxMetiers {...args} />
			</DependenciesProvider>
		);
	},
};

import { Meta, StoryObj } from '@storybook/react';

import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { Stage3emeService } from '~/client/services/stage3eme/stage3eme.service';
import { createSuccess, Either } from '~/server/errors/either';
import { MetierStage3eme } from '~/server/stage-3eme/domain/metierStage3eme';
import { aListeDeMetierStage3eme } from '~/server/stage-3eme/domain/metierStage3eme.fixture';
import { ResultatRechercheStage3eme } from '~/server/stage-3eme/domain/stage3eme';
import { aResultatRechercheStage3eme } from '~/server/stage-3eme/domain/stage3eme.fixture';

import { ComboboxMetiersStage3eme } from '.';

const meta: Meta<typeof ComboboxMetiersStage3eme> = {
	argTypes: {
		debounceTimeout: {
			description: 'Temps (en ms) attendu après la dernière saisie avant de lancer la récupération des métiers',
			table: {
				defaultValue: { summary: 300 },
			},
		},
		defaultValue: {
			description: 'Valeur par défaut du combobox',
		},
		label: {
			description: 'Libellé affiché devant le combobox',
		},
	},
	args: {
	},
	component: ComboboxMetiersStage3eme,
	parameters: {
		docs: {
			controls: { exclude: ['onFocus','onChange', 'onBlur', 'onInput', 'filter', 'requireValidOption', 'valueName'] },
		},
	},
	title: 'Components/Form/Combobox/ComboboxMetiersStage3eme',
};

class Stage3emeServiceStub implements Stage3emeService {
	async rechercherAppellationMetier(motCle?: string): Promise<Either<MetierStage3eme[]>> {
		if (!motCle) {
			return createSuccess(aListeDeMetierStage3eme());
		}
		return new Promise((resolve) => setTimeout(() => resolve(createSuccess(
			aListeDeMetierStage3eme()
				.filter((metier) => (
					metier.libelle.toLowerCase().includes(motCle.toLowerCase()))),
		)), 1000));
	}
	async rechercherStage3eme(): Promise<Either<ResultatRechercheStage3eme>> {
		return createSuccess(aResultatRechercheStage3eme());
	}
}

export default meta;
type Story = StoryObj<typeof ComboboxMetiersStage3eme>;
export const exemple: Story = {
	args: {
		debounceTimeout: 300,
	},
	render: ({ ...args }) => {
		return (
			<DependenciesProvider stage3emeService={new Stage3emeServiceStub()}>
				<ComboboxMetiersStage3eme {...args} />
			</DependenciesProvider>
		);
	},
};

export const AvecPlaceholderEtDebounce: Story = {
	args: {
		debounceTimeout: 2000,
		placeholder: 'Exemples: enseignement, recherche ... ',
	},
	render: ({ ...args }) => {
		return (
			<DependenciesProvider stage3emeService={new Stage3emeServiceStub()}>
				<ComboboxMetiersStage3eme {...args} />
			</DependenciesProvider>
		);
	},
};

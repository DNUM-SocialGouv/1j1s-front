import { Meta, StoryObj } from '@storybook/react';

import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import { MetierService } from '~/client/services/metiers/metier.service';
import { createSuccess, Either } from '~/server/errors/either';
import { Metier } from '~/server/metiers/domain/metier';
import { aListeDeMetierLaBonneAlternance } from '~/server/metiers/domain/métier.fixture';

import { HttpClientService } from '../../../../../services/httpClient.service';
import { LoggerService } from '../../../../../services/logger.service';
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

class LoggerServiceDummy extends LoggerService {}

class HttpClientServiceDummy extends HttpClientService {}

class MetierServiceStub extends MetierService {
	constructor() {
		const sessionId = 'some-session-id';
		super(new HttpClientServiceDummy('session-id', new LoggerServiceDummy(sessionId)));
	}
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

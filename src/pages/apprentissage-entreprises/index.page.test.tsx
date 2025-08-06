/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render, screen } from '@testing-library/react';

import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { aMarketingService } from '~/client/services/marketing/marketing.service.fixture';

import ApprentissageEntreprises from './index.page';

jest.mock('~/server/start', () => ({
	dependencies: {
		campagneApprentissageDependencies: {
			recupererVideosCampagneApprentissageUseCase: {
				handle: jest.fn(),
			},
		},
	},
}));

describe('<ApprentissageEntreprises />', () => {
	beforeEach(() => {
	  jest.clearAllMocks();
	});

	it('doit rendre du HTML respectant la specification', () => {
		mockSmallScreen();

		const { container } = render(
			<DependenciesProvider
				analyticsService={aManualAnalyticsService()}
				amnetService={aMarketingService()}>
				<ApprentissageEntreprises />
			</DependenciesProvider>,
		);

		expect(container.outerHTML).toHTMLValidate();
	});
	it('n’a pas de défaut d‘accessibilité', async () => {
		mockSmallScreen();

		const { container } = render(
			<DependenciesProvider
				amnetService={aMarketingService()}
				analyticsService={aManualAnalyticsService()}>
				<ApprentissageEntreprises />
			</DependenciesProvider>,
		);

		await screen.findByText('5 bonnes raisons de choisir l’apprentissage :');

		await expect(container).toBeAccessible();
	});

});

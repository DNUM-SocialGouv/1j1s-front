/**
 * @jest-environment jsdom
 */
import '~/test-utils';

import { render, screen } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { aStorageService } from '~/client/services/storage/storage.service.fixture';
import AnnonceAlternanceEntreprisePage from '~/pages/apprentissage/entreprise/[id].page';

const siret = '123';

// NOTE (GAFI 22-02-2023): Mock requis --> https://github.com/vercel/next.js/discussions/11060
function HeadMock({ children }: { children: React.ReactNode }) {
	return <>{ReactDOM.createPortal(children, document.head)}</>;
}
jest.mock('next/head', () => HeadMock);

describe('<AnnonceAlternanceEntreprisePage />', () => {
	beforeEach(() => {
		mockUseRouter({});
	});

	it('doit rendre du HTML respectant la specification', () => {
		const { container } = render(
			<DependenciesProvider analyticsService={aManualAnalyticsService()} sessionStorageService={aStorageService()}>
				<AnnonceAlternanceEntreprisePage id={siret}/>
			</DependenciesProvider>,
		);

		expect(container.outerHTML).toHTMLValidate();
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		const analyticsService = aManualAnalyticsService();
		const { container } = render(
			<DependenciesProvider analyticsService={analyticsService} sessionStorageService={aStorageService()}>
				<AnnonceAlternanceEntreprisePage id={siret}/>
			</DependenciesProvider>,
		);

		await expect(container).toBeAccessible();
	});

	it('le titre du document est correct', async () => {
		const analyticsService = aManualAnalyticsService();
		render(
			<DependenciesProvider analyticsService={analyticsService} sessionStorageService={aStorageService()}>
				<AnnonceAlternanceEntreprisePage id={siret}/>
			</DependenciesProvider>,
		);

		expect(document.title).toContain('Candidature spontanée');
	});

	it('affiche l‘iframe', async () => {
		const analyticsService = aManualAnalyticsService();
		render(
			<DependenciesProvider analyticsService={analyticsService} sessionStorageService={aStorageService()}>
				<AnnonceAlternanceEntreprisePage id={siret}/>
			</DependenciesProvider>,
		);

		const iframe = screen.getByTitle('Formulaire de candidature spontanée en alternance');
		expect(iframe).toBeInTheDocument();
	});

	it('envoie les analytics de la page à son affichage', () => {
		const analyticsService = aManualAnalyticsService();
		render(
			<DependenciesProvider analyticsService={analyticsService} sessionStorageService={aStorageService()}>
				<AnnonceAlternanceEntreprisePage id={siret}/>
			</DependenciesProvider>,
		);

		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith({
			page_template: 'emplois_detail',
			pagegroup: 'apprentissage',
			pagelabel: 'emplois_detail',
			'segment-site': 'offres_d_emploi',
		});
	});
});

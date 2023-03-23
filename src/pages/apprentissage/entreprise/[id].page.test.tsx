/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
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

	it('le titre du document est correct', async () => {
		const analyticsService = anAnalyticsService();
		render(
			<DependenciesProvider analyticsService={analyticsService}>
				<AnnonceAlternanceEntreprisePage id={siret}/>
			</DependenciesProvider>,
		);

		expect(document.title).toContain('Candidature spontanée');
	});

	it('affiche l‘iframe', async () => {
		const analyticsService = anAnalyticsService();
		render(
			<DependenciesProvider analyticsService={analyticsService}>
				<AnnonceAlternanceEntreprisePage id={siret}/>
			</DependenciesProvider>,
		);

		const iframe = screen.getByTitle('Formulaire de candidature spontanée en alternance');
		expect(iframe).toBeInTheDocument();
	});

	it('envoie les analytics de la page à son affichage', () => {
		const analyticsService = anAnalyticsService();
		render(
			<DependenciesProvider analyticsService={analyticsService}>
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

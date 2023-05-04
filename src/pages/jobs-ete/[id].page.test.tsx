/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import React from 'react';

import { HeadMock } from '~/client/components/head.mock';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import ConsulterJobEtePage from '~/pages/jobs-ete/[id].page';
import { aBarmanOffre } from '~/server/offres/domain/offre.fixture';

jest.mock('next/head', () => HeadMock);

describe('<ConsulterJobEtePage />', () => {
	beforeEach(() => {
		mockUseRouter({});
	});

	it('ajoute le nom de l’annonce au titre du document', async () => {
		const jobEte = aBarmanOffre();
		render(
			<DependenciesProvider analyticsService={anAnalyticsService()}>
				<ConsulterJobEtePage jobEte={jobEte}/>
			</DependenciesProvider>,
		);

		expect(document.title).toContain(jobEte.intitulé);
	});

	it('affiche le détail de l’annonce', async () => {
		render(
			<DependenciesProvider analyticsService={anAnalyticsService()}>
				<ConsulterJobEtePage jobEte={aBarmanOffre()}/>
			</DependenciesProvider>,
		);

		const titre = screen.getByRole('heading', { level: 1, name: /Barman/i });
		expect(titre).toBeInTheDocument();
	});

	it('envoie les analytics de la page à son affichage', () => {
		const analyticsService = anAnalyticsService();
		render(
			<DependenciesProvider analyticsService={analyticsService}>
				<ConsulterJobEtePage jobEte={aBarmanOffre()}/>
			</DependenciesProvider>,
		);

		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith({
			page_template: 'emplois_detail',
			pagegroup: 'job_etudiants',
			pagelabel: 'emplois_detail',
			'segment-site': 'offres_d_emploi',
		});
	});
});

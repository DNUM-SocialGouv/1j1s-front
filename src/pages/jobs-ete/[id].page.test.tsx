/**
 * @jest-environment jsdom
 */
import '~/test-utils';

import { render, screen } from '@testing-library/react';
import React from 'react';

import { HeadMock } from '~/client/components/head.mock';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { aStorageService } from '~/client/services/storage/storage.service.fixture';
import ConsulterJobEtePage from '~/pages/jobs-ete/[id].page';
import { anOffreEmploi } from '~/server/offres/domain/offre.fixture';

jest.mock('next/head', () => HeadMock);

describe('<ConsulterJobEtePage />', () => {
	beforeEach(() => {
		mockUseRouter({});
	});

	it('doit rendre du HTML respectant la specification', () => {
		const jobEte = anOffreEmploi();

		const { container } = render(
			<DependenciesProvider analyticsService={aManualAnalyticsService()} sessionStorageService={aStorageService()}>
				<ConsulterJobEtePage jobEte={jobEte} />
			</DependenciesProvider>,
		);

		expect(container.outerHTML).toHTMLValidate();
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		const jobEte = anOffreEmploi();
		const { container } = render(
			<DependenciesProvider analyticsService={aManualAnalyticsService()} sessionStorageService={aStorageService()}>
				<ConsulterJobEtePage jobEte={jobEte} />
			</DependenciesProvider>,
		);

		await expect(container).toBeAccessible();
	});

	it('ajoute le nom de l’annonce au titre du document', async () => {
		const jobEte = anOffreEmploi();
		render(
			<DependenciesProvider analyticsService={aManualAnalyticsService()} sessionStorageService={aStorageService()}>
				<ConsulterJobEtePage jobEte={jobEte} />
			</DependenciesProvider>,
		);

		expect(document.title).toContain(jobEte.intitulé);
	});

	it('affiche le détail de l’annonce', async () => {
		render(
			<DependenciesProvider analyticsService={aManualAnalyticsService()} sessionStorageService={aStorageService()}>
				<ConsulterJobEtePage jobEte={anOffreEmploi()} />
			</DependenciesProvider>,
		);

		const titre = screen.getByRole('heading', { level: 1, name: /Barman/i });
		expect(titre).toBeInTheDocument();
	});

	it('envoie les analytics de la page à son affichage', () => {
		const analyticsService = aManualAnalyticsService();
		render(
			<DependenciesProvider analyticsService={analyticsService} sessionStorageService={aStorageService()}>
				<ConsulterJobEtePage jobEte={anOffreEmploi()} />
			</DependenciesProvider>,
		);

		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith({
			page_template: 'emplois_detail',
			pagegroup: 'job_ete',
			pagelabel: 'emplois_detail',
			'segment-site': 'offres_d_emploi',
		});
	});
});

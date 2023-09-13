/**
 * @jest-environment jsdom
 */
import '~/test-utils';

import { render, screen } from '@testing-library/react';
import React from 'react';

import { HeadMock } from '~/client/components/head.mock';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import AnnonceAlternancePage, { AlternanceSerialized } from '~/pages/apprentissage/[id].page';
import { Alternance } from '~/server/alternances/domain/alternance';

const alternanceSerialized: AlternanceSerialized = {
	compétences: ['savoir faire'],
	dateDébut: undefined,
	description: 'description de l’annonce',
	durée: '10 ans',
	entreprise: {
		adresse: 'paris',
		nom:'une entreprise',
		téléphone: undefined,
	},
	id: '123',
	localisation: 'paris',
	natureDuContrat: 'CDI',
	niveauRequis: 'débutant',
	source: Alternance.Source.POLE_EMPLOI,
	tags: [],
	titre: 'Ma super alternance',
	typeDeContrat: ['Apprentissage'],
};

jest.mock('next/head', () => HeadMock);

describe('<AnnonceAlternancePage />', () => {
	beforeEach(() => {
		mockUseRouter({});
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		const analyticsService = anAnalyticsService();
		const { container } = render(<DependenciesProvider analyticsService={analyticsService}>
			<AnnonceAlternancePage alternanceSerialized={alternanceSerialized} />
		</DependenciesProvider>);

		await expect(container).toBeAccessible();
	});

	it('ajoute le nom de l’annonce au titre du document', async () => {
		const analyticsService = anAnalyticsService();
		render(
			<DependenciesProvider analyticsService={analyticsService}>
				<AnnonceAlternancePage alternanceSerialized={alternanceSerialized} />
			</DependenciesProvider>,
		);

		expect(document.title).toContain('Ma super alternance');
	});

	it('affiche le détail de l’annonce', async () => {
		const analyticsService = anAnalyticsService();
		render(
			<DependenciesProvider analyticsService={analyticsService}>
				<AnnonceAlternancePage alternanceSerialized={alternanceSerialized} />
			</DependenciesProvider>,
		);

		const titre = screen.getByRole('heading', { level: 1, name: /Ma super alternance/i });
		expect(titre).toBeVisible();
	});

	it('envoie les analytics de la page à son affichage', () => {
		const analyticsService = anAnalyticsService();
		render(
			<DependenciesProvider analyticsService={analyticsService}>
				<AnnonceAlternancePage alternanceSerialized={alternanceSerialized} />
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

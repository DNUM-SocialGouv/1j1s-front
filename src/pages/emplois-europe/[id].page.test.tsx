/**
 * @jest-environment jsdom
 */
import '~/test-utils';

import { render, screen } from '@testing-library/react';
import { GetServerSidePropsContext } from 'next';
import React from 'react';

import { HeadMock } from '~/client/components/head.mock';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import ConsulterEmploiEurope, { getServerSideProps } from '~/pages/emplois-europe/[id].page';
import { EmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';
import { anEmploiEurope } from '~/server/emplois-europe/domain/emploiEurope.fixture';
import { createFailure } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { dependencies } from '~/server/start';

jest.mock('next/head', () => HeadMock);
jest.mock('~/server/start', () => ({
	dependencies: {
		emploiEuropeDependencies: {
			consulterEmploiEuropeUseCase: {
				handle: jest.fn(),
			},
		},
	},
}));

describe('<ConsulterEmploiEurope />', () => {
	let emploiEurope: EmploiEurope;

	beforeEach(() => {
		process.env.NEXT_PUBLIC_EMPLOIS_EUROPE_FEATURE = '1';
		mockUseRouter({});
		emploiEurope = anEmploiEurope();
	});

	describe('lorsque la feature n‘est pas activée', () => {
		it('retourne une page 404', async () => {
			process.env.NEXT_PUBLIC_EMPLOIS_EUROPE_FEATURE = '0';

			const result = await getServerSideProps({ params: { id: '1' } } as GetServerSidePropsContext<{ id: string }>);
			expect(result).toMatchObject({ notFound: true });
		});
	});

	describe('lorsque la recherche est en erreur', () => {
		it('retourne une page 404', async () => {
			jest.spyOn(dependencies.emploiEuropeDependencies.consulterEmploiEuropeUseCase, 'handle').mockResolvedValue(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));

			const result = await getServerSideProps({ params: { id: '1' } } as GetServerSidePropsContext<{ id: string }>);
			expect(result).toMatchObject({ notFound: true });
		});
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		const analyticsService = anAnalyticsService();
		const { container } = render(<DependenciesProvider analyticsService={analyticsService}>
			<ConsulterEmploiEurope annonceEmploiEurope={emploiEurope} />
		</DependenciesProvider>);

		await expect(container).toBeAccessible();
	});

	it('ajoute le titre de l’annonce au titre du document', async () => {
		const analyticsService = anAnalyticsService();
		emploiEurope = anEmploiEurope({ titre: 'Bäcker' }); 
			
		render(
			<DependenciesProvider analyticsService={analyticsService}>
				<ConsulterEmploiEurope annonceEmploiEurope={emploiEurope} />
			</DependenciesProvider>,
		);

		expect(document.title).toContain('Bäcker');
	});

	it('affiche le titre de l’annonce', async () => {
		const analyticsService = anAnalyticsService();
		emploiEurope = anEmploiEurope({ titre: 'Bäcker' });

		render(
			<DependenciesProvider analyticsService={analyticsService}>
				<ConsulterEmploiEurope annonceEmploiEurope={emploiEurope} />
			</DependenciesProvider>,
		);

		const titre = screen.getByRole('heading', { level: 1, name: /Bäcker/i });
		expect(titre).toBeVisible();
	});

	it('envoie les analytics de la page à son affichage', () => {
		const analyticsService = anAnalyticsService();
		render(
			<DependenciesProvider analyticsService={analyticsService}>
				<ConsulterEmploiEurope annonceEmploiEurope={emploiEurope} />
			</DependenciesProvider>,
		);

		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith({
			page_template: 'emplois_detail',
			pagegroup: 'emplois_europe',
			pagelabel: 'emplois_detail',
			'segment-site': 'offres_d_emploi',
		});
	});
});

/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import RechercherAlternance from '~/client/components/features/Alternance/Rechercher/RechercherAlternance';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAlternanceService } from '~/client/services/alternance/alternance.service.fixture';
import { aLocalisationService } from '~/client/services/localisation/localisationService.fixture';
import { aMétierService } from '~/client/services/métiers/métier.fixture';
import { Alternance } from '~/server/alternances/domain/alternance';

describe('RechercherAlternance', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});
	
	describe('quand le composant est affiché sans recherche', () => {
		it('affiche un formulaire pour la recherche de formations, sans échantillon de résultat', async () => {
			// GIVEN
			const alternanceServiceMock = anAlternanceService();
			const métierServiceMock = aMétierService();
			const localisationServiceMock = aLocalisationService();
			mockUseRouter({});

			// WHEN
			render(
				<DependenciesProvider
					alternanceService={alternanceServiceMock}
					métierService={métierServiceMock}
					localisationService={localisationServiceMock}
				>
					<RechercherAlternance/>
				</DependenciesProvider>,
			);
			const formulaireRechercheAlternance = screen.getByRole('form');
			const nbRésultats = screen.queryByText(/^[0-9]+ formation(s)? en alternance$/);

			// THEN
			expect(formulaireRechercheAlternance).toBeInTheDocument();
			expect(nbRésultats).not.toBeInTheDocument();
			expect(alternanceServiceMock.rechercherAlternance).toHaveBeenCalledTimes(0);
			const filtresRecherche = screen.queryByText('Paris (75001)');
			expect(filtresRecherche).not.toBeInTheDocument();
		});
	});
	
	describe('quand le composant est affiché pour une recherche avec résultats', () => {
		it('affiche les critères de recherche sous forme d‘étiquettes', async () => {
			// GIVEN
			const alternanceFixture: Alternance[] = [
				{
					entreprise: { nom: 'MONSIEUR MICHEL' },
					id: 'an-id-matchas',
					niveauRequis: 'Cap, autres formations niveau (Infrabac)',
					source: Alternance.Source.MATCHA,
					tags: ['Apprentissage',  'Cap, autres formations niveau (Infrabac)'],
					titre: 'Ouvrier boulanger / Ouvrière boulangère',
					typeDeContrat: ['Apprentissage'],
				},
				{
					entreprise: { nom: 'une entreprise' },
					id: 'an-id-pe',
					localisation: 'paris',
					source: Alternance.Source.POLE_EMPLOI,
					tags: ['paris', 'Contrat d‘alternance', 'CDD'],
					titre: 'un titre',
					typeDeContrat: ['CDD'],
				},
			];
			const alternanceServiceMock = anAlternanceService(alternanceFixture);
			const métierServiceMock = aMétierService();
			const localisationServiceMock = aLocalisationService();
			mockUseRouter({
				query: {
					codeCommune: '75056',
					codeRomes: 'D1102%2CD1104',
					distanceCommune: '10',
					latitudeCommune: '48.859',
					libelleCommune: 'Paris (75001)',
					libelleMetier: 'Boulangerie, pâtisserie, chocolaterie',
					longitudeCommune: '2.347',
				},
			});
			const expectedQuery = {
				codeCommune: '75056',
				codeRomes: 'D1102%2CD1104',
				distanceCommune: '10',
				latitudeCommune: '48.859',
				libelleCommune: 'Paris (75001)',
				libelleMetier: 'Boulangerie, pâtisserie, chocolaterie',
				longitudeCommune: '2.347',
			};

			// WHEN
			render(
				<DependenciesProvider
					alternanceService={alternanceServiceMock}
					métierService={métierServiceMock}
					localisationService={localisationServiceMock}
				>
					<RechercherAlternance/>
				</DependenciesProvider>,
			);
			const formulaireRechercheAlternance = screen.getByRole('form');
			const messageRésultats = await screen.findByText(/^[0-9]+ offre(s)? d’alternance(s)? pour Boulangerie, pâtisserie, chocolaterie/);

			// THEN
			expect(formulaireRechercheAlternance).toBeInTheDocument();
			expect(messageRésultats).toBeInTheDocument();
			expect(alternanceServiceMock.rechercherAlternance).toHaveBeenCalledWith(expectedQuery);
			const resultList = await within(await screen.findByRole('list', { name: 'Offres d’alternances' })).findAllByTestId('RésultatRechercherSolution');
			expect(resultList).toHaveLength(alternanceFixture.length);
			expect(await screen.findByText(alternanceFixture[0].titre)).toBeInTheDocument();
			expect(await screen.findByText(alternanceFixture[1].titre)).toBeInTheDocument();
			const filtresRecherche = await screen.findByText('Paris (75001)');
			expect(filtresRecherche).toBeInTheDocument();
		});
	});

	it('affiche la section "nos articles"', () => {
		render(
			<DependenciesProvider
				alternanceService={anAlternanceService()}
				métierService={aMétierService()}
				localisationService={aLocalisationService()}>
				<RechercherAlternance/>
			</DependenciesProvider>,
		);

		const section = screen.getByRole('heading', { name: /Consultez nos articles/i });
		const card = screen.getByRole('heading', { name: /Une aide exceptionnelle pour l’apprentissage/i });

		expect(section).toBeVisible();
		expect(card).toBeVisible();
	});

	it('affiche la section "services faits pour vous"', () => {
		render(
			<DependenciesProvider
				alternanceService={anAlternanceService()}
				métierService={aMétierService()}
				localisationService={aLocalisationService()}>
				<RechercherAlternance/>
			</DependenciesProvider>,
		);

		const section = screen.getByRole('heading', { name: /Découvrez des services faits pour vous/i });
		const cardPass = screen.getByRole('heading', { name: /Recherche une offre d'alternance dans la fonction publique/i });
		const cardONISEP = screen.getByRole('heading', { name: /Besoin d‘informations sur les métiers ?/i });

		expect(section).toBeVisible();
		expect(cardPass).toBeVisible();
		expect(cardONISEP).toBeVisible();
	});

	it('n’appelle pas le service avec les query params inconnus', () => {
		// GIVEN
		const alternanceServiceMock = anAlternanceService();
		mockUseRouter({
			query: {
				codeCommune: '75056',
				codeRomes: 'D1102%2CD1104',
				distanceCommune: '10',
				latitudeCommune: '48.859',
				libelleCommune: 'Paris (75001)',
				libelleMetier: 'Boulangerie, pâtisserie, chocolaterie',
				longitudeCommune: '2.347',
				test: 'test',
			},
		});

		// WHEN
		render(
			<DependenciesProvider
				alternanceService={alternanceServiceMock}
				métierService={aMétierService()}
				localisationService={aLocalisationService()}
			>
				<RechercherAlternance/>
			</DependenciesProvider>,
		);

		// THEN
		expect(alternanceServiceMock.rechercherAlternance).toHaveBeenCalledWith(expect.not.objectContaining({
			test: 'test',
		}));
	});
});

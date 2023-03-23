/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RechercherAlternance from '~/client/components/features/Alternance/Rechercher/RechercherAlternance';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { AlternanceService } from '~/client/services/alternance/alternance.service';
import { anAlternanceService } from '~/client/services/alternance/alternance.service.fixture';
import { LocalisationService } from '~/client/services/localisation/localisation.service';
import { aLocalisationService } from '~/client/services/localisation/localisationService.fixture';
import { aMétierService } from '~/client/services/métiers/métier.fixture';
import { MétierService } from '~/client/services/métiers/métier.service';
import { Alternance, RésultatRechercheAlternance } from '~/server/alternances/domain/alternance';

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

			// THEN
			expect(formulaireRechercheAlternance).toBeInTheDocument();
			expect(screen.queryByText(/^[0-9]+ résulat(s)? $/)).not.toBeInTheDocument();
			expect(alternanceServiceMock.rechercherAlternance).toHaveBeenCalledTimes(0);
			expect(screen.queryByText('Paris (75001)')).not.toBeInTheDocument();
		});
	});

	describe('quand une recherche est effectuée', () => {
		let alternanceServiceMock: AlternanceService;
		let métierServiceMock: MétierService;
		let localisationServiceMock: LocalisationService;
		const alternanceFixture: Array<Alternance> = [
			{
				entreprise: { nom: 'MONSIEUR MICHEL' },
				id: 'an-id-matchas',
				niveauRequis: 'Cap, autres formations niveau (Infrabac)',
				source: Alternance.Source.MATCHA,
				tags: ['Apprentissage', 'Cap, autres formations niveau (Infrabac)'],
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

		const entrepriseFixture: Array<RésultatRechercheAlternance.Entreprise> = [
			{
				adresse: 'une adresse',
				candidaturePossible: true,
				id: '0123456789',
				nom: 'UN NOM 1',
				secteurs: ['secteur 1', 'secteur 2'],
				tags: ['une ville', '12 salariés', 'Candidature spontanée'],
				ville: 'une ville',
			},
			{
				candidaturePossible: false,
				id: '1234567890',
				nom: 'UN NOM 2',
				secteurs: ['secteur 1', 'secteur 2'],
				tags: ['une ville', '12 salariés', 'Candidature spontanée'],
			},
		];

		beforeEach(() => {
			alternanceServiceMock = anAlternanceService(alternanceFixture, entrepriseFixture);
			métierServiceMock = aMétierService();
			localisationServiceMock = aLocalisationService();
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
		});
		it('uniquement les offres d’alternances sont affichées', async () => {
			// GIVEN
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

			// THEN
			expect(formulaireRechercheAlternance).toBeInTheDocument();
			expect(alternanceServiceMock.rechercherAlternance).toHaveBeenCalledWith(expectedQuery);

			const filtresRecherche = await screen.findByText('Paris (75001)');
			expect(filtresRecherche).toBeInTheDocument();
			const messageRésultats = await screen.findByText('4 résultats pour Boulangerie, pâtisserie, chocolaterie');
			expect(messageRésultats).toBeInTheDocument();


			const resultListOffre = await within(await screen.findByRole('list', { name: 'Offres d’alternances' })).findAllByTestId('RésultatRechercherSolution');
			expect(resultListOffre).toHaveLength(alternanceFixture.length);
			expect(await screen.findByText(alternanceFixture[0].titre)).toBeInTheDocument();
			expect(await screen.findByText(alternanceFixture[1].titre)).toBeInTheDocument();
		});

		describe('lorsque je séléctionne les entreprises', () => {
			it('je vois uniquement les entreprises', async () => {
				render(
					<DependenciesProvider
						alternanceService={alternanceServiceMock}
						métierService={métierServiceMock}
						localisationService={localisationServiceMock}
					>
						<RechercherAlternance/>
					</DependenciesProvider>,
				);
				const onglet = await screen.findByText('Entreprises');
				const user = userEvent.setup();

				await user.click(onglet);
				expect(onglet).toHaveAttribute('aria-selected', 'true');

				const resultListEntreprise = await within(await screen.findByRole('list', { name: 'Entreprises' })).findAllByTestId('RésultatRechercherSolution');
				expect(resultListEntreprise).toHaveLength(entrepriseFixture.length);
				expect(await screen.findByText(entrepriseFixture[0].nom)).toBeVisible();
				expect(await screen.findByText(entrepriseFixture[1].nom)).toBeVisible();
			});
		});
	});

	it('affiche la section "nos articles"', () => {
		mockUseRouter({});

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
		mockUseRouter({});

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

	it('n’appelle pas le service avec les query params inconnus', async () => {
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

		await screen.findByRole('heading', { name: /Découvrez des services faits pour vous/i });

		// THEN
		expect(alternanceServiceMock.rechercherAlternance).toHaveBeenCalledWith(expect.not.objectContaining({
			test: 'test',
		}));
	});
});

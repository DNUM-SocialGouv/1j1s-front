/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import RechercherFormation from '~/client/components/features/Formation/Rechercher/RechercherFormation';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aFormationService } from '~/client/services/formation/formation.service.fixture';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
import { aMetierService } from '~/client/services/metiers/metier.fixture';
import { NiveauRequis, RésultatRechercheFormation } from '~/server/formations/domain/formation';

describe('RechercherFormation', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('quand le composant est affiché sans recherche', () => {
		it('affiche un formulaire pour la recherche de formations, sans échantillon de résultat', async () => {
			// GIVEN
			const formationServiceMock = aFormationService();
			const métierServiceMock = aMetierService();
			const localisationServiceMock = aLocalisationService();
			mockUseRouter({});

			// WHEN
			render(
				<DependenciesProvider
					formationService={formationServiceMock}
					metierService={métierServiceMock}
					localisationService={localisationServiceMock}
				>
					<RechercherFormation/>
				</DependenciesProvider>,
			);
			const formulaireRechercheFormation = screen.getByRole('form');
			const nbRésultats = screen.queryByText(/^[0-9]+ formation(s)? en alternance$/);

			// THEN
			expect(formulaireRechercheFormation).toBeInTheDocument();
			expect(nbRésultats).not.toBeInTheDocument();
			expect(formationServiceMock.rechercherFormation).toHaveBeenCalledTimes(0);
		});
	});
	describe('quand le composant est affiché pour une recherche avec résultats', () => {
		it('affiche les critères de recherche sous forme d‘étiquettes', async () => {
			// GIVEN
			const formationFixture: RésultatRechercheFormation[] = [
				{
					id: '123',
					nomEntreprise: 'La Bonne Alternance',
					tags: ['Paris', NiveauRequis['NIVEAU_5']],
					titre: 'Développeur web',
				},
			];
			const formationServiceMock = aFormationService(formationFixture);
			const métierServiceMock = aMetierService();
			const localisationServiceMock = aLocalisationService();
			mockUseRouter({
				query: {
					codeRomes: 'D1103,D1101,H2101',
					libelleMetier: 'Boucherie,charcuterie,traiteur',
				},
			});

			// WHEN
			render(
				<DependenciesProvider
					formationService={formationServiceMock}
					metierService={métierServiceMock}
					localisationService={localisationServiceMock}
				>
					<RechercherFormation/>
				</DependenciesProvider>,
			);
			const formulaireRechercheFormation = screen.getByRole('form');
			const nbRésultats = await screen.findByText(/[0-9]+ formation(s)? en alternance pour Boucherie,charcuterie,traiteur/);

			// THEN
			expect(formulaireRechercheFormation).toBeInTheDocument();
			expect(nbRésultats).toBeInTheDocument();
			expect(formationServiceMock.rechercherFormation).toHaveBeenCalledWith({
				codeRomes: ['D1103', 'D1101', 'H2101'],
				libelleMetier: 'Boucherie,charcuterie,traiteur',
			});
			const resultList = await screen.findByRole('list', { name: 'Formations en alternance' });
			const resultListElements = within(resultList).getAllByText('En savoir plus');
			expect(resultListElements).toHaveLength(formationFixture.length);
			expect(await screen.findByText((formationFixture[0].titre))).toBeInTheDocument();
		});
		it('affiche les résultats avec un lien vers la page de la formation', async () => {
			// GIVEN
			const formationFixture: RésultatRechercheFormation[] = [
				{
					codeCertification: '123456',
					id: '123',
					nomEntreprise: 'La Bonne Alternance',
					tags: ['Paris', NiveauRequis['NIVEAU_5']],
					titre: 'Développeur web',
				},
			];
			const formationServiceMock = aFormationService(formationFixture);
			const métierServiceMock = aMetierService();
			const localisationServiceMock = aLocalisationService();
			mockUseRouter({
				query: {
					codeCommune: '75056',
					codeRomes: 'D1103,D1101,H2101',
					distanceCommune: '10',
					latitudeCommune: '48.856614',
					libelleCommune: 'Paris',
					libelleMetier: 'Boucherie,charcuterie,traiteur',
					longitudeCommune: '2.3522219',
				},
			});

			// WHEN
			render(
				<DependenciesProvider
					formationService={formationServiceMock}
					metierService={métierServiceMock}
					localisationService={localisationServiceMock}
				>
					<RechercherFormation/>
				</DependenciesProvider>,
			);

			// THEN
			const resultList = await screen.findByRole('list', { name: 'Formations en alternance' });
			const resultListElements = within(resultList).getAllByRole('link');
			expect(resultListElements).toHaveLength(formationFixture.length);
			expect(resultListElements[0].getAttribute('href')).toEqual('/formations/apprentissage/123?codeCommune=75056&codeRomes=D1103%2CD1101%2CH2101&distanceCommune=10&latitudeCommune=48.856614&longitudeCommune=2.3522219&codeCertification=123456');
		});
	});

	it('affiche une liste de services en relation', async () => {
		// GIVEN
		const formationServiceMock = aFormationService();
		const métierServiceMock = aMetierService();
		const localisationServiceMock = aLocalisationService();
		mockUseRouter({});

		// WHEN
		render(
			<DependenciesProvider
				formationService={formationServiceMock}
				metierService={métierServiceMock}
				localisationService={localisationServiceMock}
			>
				<RechercherFormation/>
			</DependenciesProvider>,
		);

		const entête = screen.getByRole('heading', { level: 2 });
		expect(entête).toHaveTextContent('Découvrez des services faits pour vous');
		expect(entête).toBeVisible();

		const listeDeServices = screen.getByRole('list', { name: 'Liste des partenaires et des services' });
		const campagneApprentissageCard = within(listeDeServices).getByRole('heading', { name: /L’apprentissage est-il fait pour vous ?/i });
		const cpfCard = within(listeDeServices).getByRole('heading', { name: /Découvrez le dispositif Mon compte formation/i });
		const parcoursupCard = within(listeDeServices).getByRole('heading', { name: /La plateforme de pré-inscription en première année de l’enseignement supérieur/i });
		const carifOrefCard = within(listeDeServices).getByRole('heading', { name: /Besoin d’une formation qualifiante pour préparer votre entrée, votre maintien ou votre retour sur le marché du travail ?/i });
		const metiersDuSoinCard = within(listeDeServices).getByRole('heading', { name: /Renseignez-vous sur les métiers du soin/i });
		const pixCard = within(listeDeServices).getByRole('heading', { name: /Testez vous sur Pix !/i });
		expect(campagneApprentissageCard).toBeVisible();
		expect(cpfCard).toBeVisible();
		expect(parcoursupCard).toBeVisible();
		expect(carifOrefCard).toBeVisible();
		expect(metiersDuSoinCard).toBeVisible();
		expect(pixCard).toBeVisible();
	});

	it('filtre les query params envoyés au service', async () => {
		const formationService = aFormationService();
		mockUseRouter({
			query: {
				codeCommune: '75056',
				codeRomes: 'M1805%2CM1806%2CM1802',
				distanceCommune: '10',
				latitudeCommune: '48.859',
				libelleCommune: 'Paris+%2875001%29',
				libelleMetier: 'Développement+web%2C+intégration',
				longitudeCommune: '2.347',
				niveauEtudes: '4',
				test: 'test',
			},
		});

		render(
			<DependenciesProvider
				formationService={formationService}
				metierService={aMetierService()}
				localisationService={aLocalisationService()}
			>
				<RechercherFormation/>
			</DependenciesProvider>,
		);

		await screen.findByRole('list', { name: 'Formations en alternance' });
		expect(formationService.rechercherFormation).toHaveBeenCalledWith(expect.not.objectContaining({
			test: 'test',
		}));
	});
});

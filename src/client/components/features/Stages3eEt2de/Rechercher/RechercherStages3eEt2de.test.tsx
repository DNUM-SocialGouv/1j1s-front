/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aCommuneQuery } from '~/client/hooks/useCommuneQuery';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
import { aMetierService } from '~/client/services/metiers/metier.fixture';
import { aStage3eEt2deService } from '~/client/services/stage3eEt2de/stage3eEt2de.service.fixture';
import { createSuccess } from '~/server/errors/either';
import { aResultatRechercheStage3eEt2de, aStage3eEt2de } from '~/server/stage-3e-et-2de/domain/stage3eEt2de.fixture';

import RechercherStages3eEt2de from './RechercherStages3eEt2de';

describe('La recherche des stages de 3e et 2de', () => {
	describe('quand le composant est affiché sans paramètres de recherche dans l’URL', () => {
		it('ne fait pas d‘appel et affiche un formulaire de recherche', async () => {
			// GIVEN
			mockUseRouter({});
			const stage3eEt2deServiceMock = aStage3eEt2deService();
			// WHEN
			const metierStage3eEt2deService = aMetierService();
			render(<DependenciesProvider stage3eEt2deService={stage3eEt2deServiceMock} localisationService={aLocalisationService()} metierStage3eEt2deService={metierStage3eEt2deService}>
				<RechercherStages3eEt2de/>
			</DependenciesProvider>);

			// THEN
			const formulaireRecherche = await screen.findByRole('search', { name: 'Rechercher un stage de 3e et 2de' });
			expect(formulaireRecherche).toBeVisible();
			expect(stage3eEt2deServiceMock.rechercherStage3eEt2de).not.toHaveBeenCalled();
			const titre = await screen.findByRole('heading', {
				level: 1,
				name: 'Des milliers d’entreprises prêtes à vous accueillir pour votre stage de 3e et 2de',
			});
			expect(titre).toBeVisible();
		});
	});

	describe('quand le composant est affiché pour une recherche avec 1 résultat', () => {
		it('affiche le résultat de la recherche', async () => {
			// GIVEN
			mockSmallScreen();
			mockUseRouter({ query: { ...aCommuneQuery() } });
			const stage3eEt2deServiceMock = aStage3eEt2deService();
			const resultatRecherche = aResultatRechercheStage3eEt2de({
				nombreDeResultats: 1,
				resultats: [
					aStage3eEt2de({
						adresse: {
							codeDepartement: '75',
							codePostal: '75000',
							rueEtNumero: '1 rue de la Paix',
							ville: 'Paris',
						},
						domaine: 'Informatique',
						nomEntreprise: 'Entreprise 1',
					}),
				],
			});
			jest.spyOn(stage3eEt2deServiceMock, 'rechercherStage3eEt2de').mockResolvedValue(createSuccess(resultatRecherche));

			// WHEN
			render(<DependenciesProvider stage3eEt2deService={stage3eEt2deServiceMock} localisationService={aLocalisationService()} metierStage3eEt2deService={aMetierService()}>
				<RechercherStages3eEt2de/>
			</DependenciesProvider>);
			const messageResultatsRecherche = await screen.findByText('1 entreprise accueillante');
			const resultatsUl = await screen.findAllByRole('list', { name: 'Stages de 3e et 2de' });
			// eslint-disable-next-line testing-library/no-node-access
			const resultats = resultatsUl[0].children;

			// THEN
			expect(messageResultatsRecherche).toBeVisible();
			expect(resultats).toHaveLength(resultatRecherche.nombreDeResultats);
			expect(resultats[0]).toHaveTextContent('Entreprise 1');
			expect(resultats[0]).toHaveTextContent('Informatique');
			expect(resultats[0]).toHaveTextContent('1 rue de la Paix');
			expect(resultats[0]).toHaveTextContent('75000 Paris');
		});
	});

	describe('quand le composant est affiché pour une recherche avec plusieurs résultats', () => {
		it('affiche le résultat de la recherche', async () => {
			// GIVEN
			mockSmallScreen();
			mockUseRouter({ query: { ...aCommuneQuery() } });
			const stage3eEt2deServiceMock = aStage3eEt2deService();
			const resultatRecherche = aResultatRechercheStage3eEt2de({
				nombreDeResultats: 2,
				resultats: [
					aStage3eEt2de({
						adresse: {
							codeDepartement: '75',
							codePostal: '75000',
							rueEtNumero: '1 rue de la Paix',
							ville: 'Paris',
						},
						domaine: 'Informatique',
						nomEntreprise: 'Entreprise 1',
					}),
					aStage3eEt2de({
						adresse: {
							codeDepartement: '75',
							codePostal: '75000',
							rueEtNumero: '2 rue de la Paix',
							ville: 'Paris',
						},
						domaine: 'Informatique',
						nomEntreprise: 'Entreprise 2',
					}),
				],
			});
			jest.spyOn(stage3eEt2deServiceMock, 'rechercherStage3eEt2de').mockResolvedValue(createSuccess(resultatRecherche));

			// WHEN
			render(<DependenciesProvider stage3eEt2deService={stage3eEt2deServiceMock} localisationService={aLocalisationService()} metierStage3eEt2deService={aMetierService()}>
				<RechercherStages3eEt2de/>
			</DependenciesProvider>);
			const messageResultatsRecherche = await screen.findByText('2 entreprises accueillantes');
			const resultatsUl = await screen.findAllByRole('list', { name: 'Stages de 3e et 2de' });
			// eslint-disable-next-line testing-library/no-node-access
			const resultats = resultatsUl[0].children;

			// THEN
			expect(messageResultatsRecherche).toBeVisible();
			expect(resultats).toHaveLength(resultatRecherche.nombreDeResultats);
			expect(resultats[0]).toHaveTextContent('Entreprise 1');
			expect(resultats[0]).toHaveTextContent('Informatique');
			expect(resultats[0]).toHaveTextContent('1 rue de la Paix');
			expect(resultats[0]).toHaveTextContent('75000 Paris');
			expect(resultats[1]).toHaveTextContent('Entreprise 2');
			expect(resultats[1]).toHaveTextContent('Informatique');
			expect(resultats[1]).toHaveTextContent('2 rue de la Paix');
			expect(resultats[1]).toHaveTextContent('75000 Paris');
		});

		describe('quand la recherche est filtrée par métier', () => {
			it('affiche le résultat de la recherche', async () => {
				// GIVEN
				mockSmallScreen();
				mockUseRouter({ query: { libelleMetier: 'Informatique', ...aCommuneQuery() } });
				const stage3eEt2deServiceMock = aStage3eEt2deService();

				const resultatRecherche = aResultatRechercheStage3eEt2de({
					nombreDeResultats: 1,
					resultats: [
						aStage3eEt2de({
							adresse: {
								codeDepartement: '75',
								codePostal: '75000',
								rueEtNumero: '1 rue de la Paix',
								ville: 'Paris',
							},
							domaine: 'Informatique',
							nomEntreprise: 'Entreprise 1',
						}),
					],
				});

				jest.spyOn(stage3eEt2deServiceMock, 'rechercherStage3eEt2de').mockResolvedValue(createSuccess(resultatRecherche));

				// WHEN
				render(<DependenciesProvider stage3eEt2deService={stage3eEt2deServiceMock} localisationService={aLocalisationService()} metierStage3eEt2deService={aMetierService()}>
					<RechercherStages3eEt2de/>
				</DependenciesProvider>);
				const messageResultatsRecherche = await screen.findByText('1 entreprise accueillante pour Informatique');

				// THEN
				expect(messageResultatsRecherche).toBeVisible();
			});
		});
	});

	describe('étiquettes de recherche', () => {
		it('je vois la localisation', async () => {
			mockSmallScreen();
			mockUseRouter({ query: { ...aCommuneQuery({ libelleCommune: 'Paris' }) } });
			const stage3eEt2deServiceMock = aStage3eEt2deService();

			render(<DependenciesProvider stage3eEt2deService={stage3eEt2deServiceMock} localisationService={aLocalisationService()} metierStage3eEt2deService={aMetierService()}>
				<RechercherStages3eEt2de/>
			</DependenciesProvider>);

			await screen.findAllByRole('list', { name: 'Stages de 3e et 2de' });

			const etiquetteList = screen.getByRole('list', { name: 'Filtres de la recherche' });
			expect(etiquetteList).toBeVisible();
			expect(within(etiquetteList).getByRole('listitem')).toHaveTextContent('Paris');
		});
	});
});

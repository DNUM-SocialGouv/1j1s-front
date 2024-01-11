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
import { aStage3emeEt2ndService } from '~/client/services/stage3emeEt2nd/stage3emeEt2nd.service.fixture';
import { createSuccess } from '~/server/errors/either';
import { aResultatRechercheStage3emeEt2nd, aStage3emeEt2nd } from '~/server/stage-3eme-et-2nd/domain/stage3emeEt2nd.fixture';

import RechercherStages3emeEt2nd from './RechercherStages3emeEt2nd';

describe('La recherche des stages de 3ème et 2nd', () => {
	describe('quand le composant est affiché sans paramètres de recherche dans l’URL', () => {
		it('ne fait pas d‘appel et affiche un formulaire de recherche', async () => {
			// GIVEN
			mockUseRouter({});
			const stage3emeEt2ndServiceMock = aStage3emeEt2ndService();
			// WHEN
			const metierStage3emeEt2ndService = aMetierService();
			render(<DependenciesProvider stage3emeEt2ndService={stage3emeEt2ndServiceMock} localisationService={aLocalisationService()} metierStage3emeEt2ndService={metierStage3emeEt2ndService}>
				<RechercherStages3emeEt2nd/>
			</DependenciesProvider>);

			// THEN
			const formulaireRecherche = await screen.findByRole('search', { name: 'Rechercher un stage de 3ème et 2nd' });
			expect(formulaireRecherche).toBeVisible();
			expect(stage3emeEt2ndServiceMock.rechercherStage3emeEt2nd).not.toHaveBeenCalled();
			const titre = await screen.findByRole('heading', {
				level: 1,
				name: 'Des milliers d’entreprises prêtes à vous accueillir pour votre stage de 3ème et 2nd',
			});
			expect(titre).toBeVisible();
		});
	});

	describe('quand le composant est affiché pour une recherche avec 1 résultat', () => {
		it('affiche le résultat de la recherche', async () => {
			// GIVEN
			mockSmallScreen();
			mockUseRouter({ query: { ...aCommuneQuery() } });
			const stage3emeEt2ndServiceMock = aStage3emeEt2ndService();
			const resultatRecherche = aResultatRechercheStage3emeEt2nd({
				nombreDeResultats: 1,
				resultats: [
					aStage3emeEt2nd({
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
			jest.spyOn(stage3emeEt2ndServiceMock, 'rechercherStage3emeEt2nd').mockResolvedValue(createSuccess(resultatRecherche));

			// WHEN
			render(<DependenciesProvider stage3emeEt2ndService={stage3emeEt2ndServiceMock} localisationService={aLocalisationService()} metierStage3emeEt2ndService={aMetierService()}>
				<RechercherStages3emeEt2nd/>
			</DependenciesProvider>);
			const messageResultatsRecherche = await screen.findByText('1 entreprise accueillante');
			const resultatsUl = await screen.findAllByRole('list', { name: 'Stages de 3ème et 2nd' });
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
			const stage3emeEt2ndServiceMock = aStage3emeEt2ndService();
			const resultatRecherche = aResultatRechercheStage3emeEt2nd({
				nombreDeResultats: 2,
				resultats: [
					aStage3emeEt2nd({
						adresse: {
							codeDepartement: '75',
							codePostal: '75000',
							rueEtNumero: '1 rue de la Paix',
							ville: 'Paris',
						},
						domaine: 'Informatique',
						nomEntreprise: 'Entreprise 1',
					}),
					aStage3emeEt2nd({
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
			jest.spyOn(stage3emeEt2ndServiceMock, 'rechercherStage3emeEt2nd').mockResolvedValue(createSuccess(resultatRecherche));

			// WHEN
			render(<DependenciesProvider stage3emeEt2ndService={stage3emeEt2ndServiceMock} localisationService={aLocalisationService()} metierStage3emeEt2ndService={aMetierService()}>
				<RechercherStages3emeEt2nd/>
			</DependenciesProvider>);
			const messageResultatsRecherche = await screen.findByText('2 entreprises accueillantes');
			const resultatsUl = await screen.findAllByRole('list', { name: 'Stages de 3ème et 2nd' });
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
				const stage3emeEt2ndServiceMock = aStage3emeEt2ndService();

				const resultatRecherche = aResultatRechercheStage3emeEt2nd({
					nombreDeResultats: 1,
					resultats: [
						aStage3emeEt2nd({
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

				jest.spyOn(stage3emeEt2ndServiceMock, 'rechercherStage3emeEt2nd').mockResolvedValue(createSuccess(resultatRecherche));

				// WHEN
				render(<DependenciesProvider stage3emeEt2ndService={stage3emeEt2ndServiceMock} localisationService={aLocalisationService()} metierStage3emeEt2ndService={aMetierService()}>
					<RechercherStages3emeEt2nd/>
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
			const stage3emeEt2ndServiceMock = aStage3emeEt2ndService();

			render(<DependenciesProvider stage3emeEt2ndService={stage3emeEt2ndServiceMock} localisationService={aLocalisationService()} metierStage3emeEt2ndService={aMetierService()}>
				<RechercherStages3emeEt2nd/>
			</DependenciesProvider>);

			await screen.findAllByRole('list', { name: 'Stages de 3ème et 2nd' });

			const etiquetteList = screen.getByRole('list', { name: 'Filtres de la recherche' });
			expect(etiquetteList).toBeVisible();
			expect(within(etiquetteList).getByRole('listitem')).toHaveTextContent('Paris');
		});
	});
});

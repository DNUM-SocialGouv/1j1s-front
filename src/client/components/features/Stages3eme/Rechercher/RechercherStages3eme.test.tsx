/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aStage3emeService } from '~/client/services/stage3eme/stage3eme.service.fixture';
import { createSuccess } from '~/server/errors/either';
import { aResultatRechercheStage3eme } from '~/server/stage-3eme/domain/stage3eme.fixture';

import RechercherStages3eme from './RechercherStages3eme';

describe('La recherche des stages de 3ème', () => {
	describe('quand le composant est affiché sans paramètres de recherche dans l’URL', () => {
		it('affiche un formulaire de recherche', async () => {
			// GIVEN
			mockUseRouter({});
			const stage3emeServiceMock = aStage3emeService();
			// WHEN
			render(<DependenciesProvider stage3emeService={stage3emeServiceMock}>
				<RechercherStages3eme/>
			</DependenciesProvider>);

			// THEN
			const formulaireRecherche = await screen.findByRole('search', { name: 'Rechercher un stage de 3ème' });
			expect(formulaireRecherche).toBeVisible();
			const titre = await screen.findByRole('heading', {
				level: 1,
				name: 'Des milliers d’entreprises prêtes à vous accueillir pour votre stage de 3ème',
			});
			expect(titre).toBeVisible();
		});
	});
	describe('quand le composant est affiché pour une recherche avec 1 résultat', () => {
		it('affiche le résultat de la recherche', async () => {
			// GIVEN
			mockSmallScreen();
			mockUseRouter({ query: { location: 'here' } });
			const stage3emeServiceMock = aStage3emeService();
			const resultatRecherche = aResultatRechercheStage3eme({
				nombreDeResultats: 1,
				resultats: [
					{
						adresse: {
							codeDepartement: '75',
							codePostal: '75000',
							ligne: '1 rue de la Paix',
							ville: 'Paris',
						},
						domaine: 'Informatique',
						nomEntreprise: 'Entreprise 1',
					},
				],
			});
			jest.spyOn(stage3emeServiceMock, 'rechercherStage3eme').mockResolvedValue(createSuccess(resultatRecherche));

			// WHEN
			render(<DependenciesProvider stage3emeService={stage3emeServiceMock}>
				<RechercherStages3eme/>
			</DependenciesProvider>);
			const resultatsUl = await screen.findAllByRole('list', { name: 'Stages de 3ème' });
			// eslint-disable-next-line testing-library/no-node-access
			const resultats = resultatsUl[0].children;

			// THEN
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
			mockUseRouter({ query: { location: 'here' } });
			const stage3emeServiceMock = aStage3emeService();
			const resultatRecherche = aResultatRechercheStage3eme({
				nombreDeResultats: 2,
				resultats: [
					{
						adresse: {
							codeDepartement: '75',
							codePostal: '75000',
							ligne: '1 rue de la Paix',
							ville: 'Paris',
						},
						domaine: 'Informatique',
						nomEntreprise: 'Entreprise 1',
					},
					{
						adresse: {
							codeDepartement: '75',
							codePostal: '75000',
							ligne: '2 rue de la Paix',
							ville: 'Paris',
						},
						domaine: 'Informatique',
						nomEntreprise: 'Entreprise 2',
					},
				],
			});
			jest.spyOn(stage3emeServiceMock, 'rechercherStage3eme').mockResolvedValue(createSuccess(resultatRecherche));

			// WHEN
			render(<DependenciesProvider stage3emeService={stage3emeServiceMock}>
				<RechercherStages3eme/>
			</DependenciesProvider>);
			const resultatsUl = await screen.findAllByRole('list', { name: 'Stages de 3ème' });
			// eslint-disable-next-line testing-library/no-node-access
			const resultats = resultatsUl[0].children;

			// THEN
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
	});
});

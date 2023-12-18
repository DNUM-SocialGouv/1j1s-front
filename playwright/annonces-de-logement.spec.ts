import { expect, test } from '@playwright/test';

import logementNonFiltreeResponse from '../cypress/fixture/annonces/logementNonfiltreeMeilisearchResponse.fixture.json';



test.describe('Parcours logement', () => {
	test.describe('quand on arrive sur la pages des annonces de logement', () => {
		test.describe('quand il y a des annonces', () => {
            
			test('affiche le résultat du nombre d\'annonces de logements', async ({ page }) => {
				page.route('**/multi-search', async (route) => {
					await route.fulfill({ json: logementNonFiltreeResponse });
				});
				await page.goto('/logements/annonces');
                
				const nombreDeResultats = await page.getByRole('heading', { level: 2, name: '4 annonces pour étudiants' });
				await expect(nombreDeResultats).toBeVisible();
			});

			test('affiche une liste de 4 annonces de logement par défaut', async ({ page }) => {
				page.route('**/multi-search', async (route) => {
					await route.fulfill({ json: logementNonFiltreeResponse });
				});
				await page.goto('/logements/annonces');

				const resultatsDeRecherche = await page.getByRole('region', { name: 'Résultats de la recherche' });
				const titreAnnonces = await resultatsDeRecherche.getByRole('heading', { level: 3 });
				await expect(titreAnnonces).toHaveCount(4);
			});
		});
	});
});

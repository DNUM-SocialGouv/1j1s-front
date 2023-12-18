import { expect, test } from '@playwright/test';

import stageNonFiltreeResponse from '../cypress/fixture/annonces/stageNonFiltreeMeilisearcheResponse.fixture.json';

test.beforeEach(async ({ page }) => {
	await page.route('**/multi-search', async (route) => {
		await route.fulfill({ json: stageNonFiltreeResponse });
	});
	await page.goto('/stages');
});

test.describe('Stages', () => {
	test.describe('quand on arrive sur la page de recherche de stages', () => {
		test.describe('quand on fait une recherche par domaines', () => {
			test('affiche les domaines par ordre alphabétique avec non renseigné en dernier element', async ({ page }) => {
				// FIXME (GAFI 06-11-2023): Devrait être role combobox
				await page.getByRole('button', { name: /Domaines/i }).click();

				const options = page.getByRole('option');
				await expect(options.first()).toHaveText('Achats');
				await expect(options.nth(1)).toHaveText('Production');
				await expect(options.nth(2)).toHaveText('Travaux');
				await expect(options.last()).toHaveText('Non renseigné');
				await expect(options.first()).toBeVisible();

				const premierResultat = page.getByRole('link', { name: /Développeur/i });
				await expect(premierResultat).toBeVisible();
			});
		});
	});
});

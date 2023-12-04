import { devices, expect, test } from '@playwright/test';

import stageNonFiltreeResponse from '../cypress/fixture/annonces/stageNonFiltreeMeilisearcheResponse.fixture.json';

test.beforeEach(async ({ page }) => {
	await page.route('**/multi-search', async (route) => {
		await route.fulfill({ json: stageNonFiltreeResponse });
	});
	await page.goto('/stages');
});

test.use({
	...devices['iPhone X'],
});

test.describe('Stages', () => {
	test.describe('quand on arrive sur la page de recherche de stages', () => {
		test.describe('quand on fait une recherche par domaines', () => {
			test('affiche les domaines par ordre alphabétique avec non renseigné en dernier element', ({ page }) => {
				// FIXME (GAFI 06-11-2023): Devrait être role combobox
				page.getByRole('button', { name: /Domaines/i }).click();

				const options = page.getByRole('option');
				expect(options.first()).toHaveText('Achats');
				expect(options.nth(1)).toHaveText('Production');
				expect(options.nth(2)).toHaveText('Travaux');
				expect(options.last()).toHaveText('Non renseigné');
			});
		});
	});
});

import { expect, test } from '@playwright/test';

test.describe('Formulaire CEJ', () => {
	test.describe('quand l’utilisateur demande à être contacté', () => {
		test('envoie la demande de contact', async ({ page }) => {
			page.route('/api/communes?q=*', (route) => {
				route.fulfill({ json: { résultats: [
					{
						code: '75056',
						codePostal: '75006',
						coordonnées: {
							latitude: 48.859,
							longitude: 2.347,
						},
						libelle: 'Paris (75006)',
						ville: 'Paris',
					},
				] } });
			});
			page.route('/api/demandes-de-contact', (route) => {
				route.fulfill({ status: 201 });
			});
			const demandeEnvoyee = page.waitForRequest('/api/demandes-de-contact');
			await page.goto('/contrat-engagement-jeune');

			// FIXME (GAFI 23-10-2023): Mauvais point, ça devrait être un point médian
			await page.getByRole('button', { name: 'Demander à être contacté.e' }).click();

			// FIXME (GAFI 23-10-2023): deuxième titre de niveau 1 sur la ˆpaetrege ...
			const heading = page.getByRole('heading', {
				name: 'J‘ai des questions sur le Contrat d‘Engagement Jeune et souhaite être rappelé',
			});
			await expect(heading).toBeVisible();
			const champPrenom = page.getByRole('textbox', { name: 'Prénom' });
			await expect(champPrenom).toBeFocused();

			await champPrenom.fill('Jean');
			await page.getByRole('textbox', { exact: true, name: 'Nom' }).fill('Dupont');
			await page.getByRole('textbox', { name: 'Adresse email' }).fill('jean.dupont@mail.com');
			await page.getByRole('textbox', { name: 'Téléphone' }).fill('0688552233');
			// FIXME (GAFI 23-10-2023): Manque un circonflèxe par ici ...
			//		Also devrait être combobox
			await page.getByRole('button', { exact: true, name: 'Age' }).click();
			// FIXME (GAFI 19-12-2023): Manque un petit label sur la listbox
			await page.getByRole('listbox')
				.getByRole('option', { name: '16 ans' })
				.click();
			// FIXME (GAFI 19-12-2023): Devrait être combobox ?
			await page.getByRole('textbox', { name: 'Ville' }).fill('paris');
			// FIXME (GAFI 19-12-2023): Manque un petit label sur la listbox
			await page.getByRole('listbox')
				.getByRole('option', { name: 'Paris' })
				.click();
			await page.getByRole('button', { name: /Envoyer la demande/i }).click();

			const request = await demandeEnvoyee;
			expect(request.method()).toEqual('POST');
			expect(request.url()).toMatch(/\/api\/demandes-de-contact$/);
			expect(request.postDataJSON()).toMatchObject({
				age: 16,
				codePostal: '75006',
				email: 'jean.dupont@mail.com',
				nom: 'Dupont',
				prénom: 'Jean',
				type: 'CEJ',
				téléphone: '0688552233',
				ville: 'Paris',
			});
			await expect(page.getByRole('heading', { name: 'Votre demande a bien été transmise !' })).toBeVisible();
		});
	});
});

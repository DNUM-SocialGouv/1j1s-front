import { expect, test } from '@playwright/test';
import { stringify } from 'querystring';

import { Strapi } from '../src/server/cms/infra/repositories/strapi.response';
import {
	aMissionLocaleÉtablissementAccompagnementList,
	anOrderedÉtablissementAccompagnementList,
} from '../src/server/établissement-accompagnement/domain/etablissementAccompagnement.fixture';
import { aCommuneList } from '../src/server/localisations/domain/localisationAvecCoordonnées.fixture';

test.describe('Accompagnement', () => {
	test.describe('quand l’utilisateur arrive sur la page sans paramètre', () => {
		test.beforeEach(async ({ page }) => {
			await page.goto('/accompagnement');
		});

		test.describe('quand l’utilisateur lance une recherche', () => {
			test('affiche les resultats de la recherche et change l’url', async ({ page }) => {
				await page.route('/api/communes?q=*', (route) => {
					route.fulfill({ json: { résultats: aCommuneList() } });
				});
				await page.route('/api/etablissements-accompagnement?*', (route) => {
					route.fulfill({ json: anOrderedÉtablissementAccompagnementList() });
				});

				const localisation = page.getByRole('combobox', { name: /Localisation/i });
				await localisation.fill('par');
				await page.getByRole('listbox', { name: /Localisation/i })
					.getByRole('option')
					.first()
					.click();
				await page.getByRole('button', { name: /Type d‘accompagnement/i }).click();
				// FIXME (GAFI 19-12-2023): Manque un petit nom accessible sur la listbox
				await page.getByRole('listbox')
					.getByRole('option')
					.first()
					.click();
				await page.getByRole('button', { name: /Rechercher/i }).click();

				await expect(page).toHaveURL(/codeCommune=.*/i);
				await expect(page).toHaveURL(/typeAccompagnement=.*/i);
				const resultatsRecherche = page
					.getByRole('list', { name: /Établissements d‘accompagnement/i })
					.locator('> li');
				await expect(resultatsRecherche).toHaveCount(3);
			});
		});
		test.describe('quand l‘utilisateur souhaite contacter un établissement d‘accompagnement', () => {
			test('permet d‘envoyer une demande de contact', async ({ page }) => {
				await page.route('/api/communes?q=*', (route) => {
					route.fulfill({ json: { résultats: aCommuneList() } });
				});
				await page.route('/api/etablissements-accompagnement?*', (route) => {
					route.fulfill({ json: aMissionLocaleÉtablissementAccompagnementList() });
				});
				await page.route('/api/etablissements-accompagnement/contact', (route) => route.fulfill({ status: 201 }));
				const demandeDeContactEnvoyee = page.waitForRequest('/api/etablissements-accompagnement/contact');
				const demandeDeContact = {
					age: 23,
					commentaire: 'Merci de me recontacter',
					commune: 'Paris (75006)',
					email: 'john.doe@email.com',
					nom: 'Doe',
					prénom: 'John',
					téléphone: '0606060606',
				};
				const etablissement = aMissionLocaleÉtablissementAccompagnementList()[0];

				await page.getByRole('combobox', { name: /Localisation/i }).fill('par');
				await page.getByRole('listbox', { name: /Localisation/i })
					.getByRole('option')
					.first()
					.click();
				await page.getByRole('button', { name: /Type d‘accompagnement/i }).click();
				// FIXME (GAFI 19-12-2023): Manque un petit nom accessible sur la listbox
				await page.getByRole('listbox')
					.getByRole('option')
					.first()
					.click();

				await page.getByRole('button', { name: /Rechercher/i }).click();
				const resultatRecherche = page
					.getByRole('list', { name: /Établissements d‘accompagnement/i })
					.locator('> li')
					.first();
				await resultatRecherche.getByRole('button', { name: 'Je souhaite être contacté(e)' })
					.click();

				const modale = page.getByRole('dialog');
				await expect(modale).toBeVisible();
				await expect(modale.getByRole('heading', { level: 1 })).toHaveText('Je souhaite être contacté(e) par la Mission Locale');

				await modale.getByRole('textbox', { name: 'Prénom' }).fill(demandeDeContact.prénom);
				await modale.getByRole('textbox', { exact: true, name: 'Nom' }).fill(demandeDeContact.nom);
				await modale.getByRole('textbox', { name: 'Adresse e-mail' }).fill(demandeDeContact.email);
				await modale.getByRole('textbox', { name: 'Téléphone' }).fill(demandeDeContact.téléphone);
				await modale.getByRole('button', { name: 'Age' }).click();
				await modale.getByRole('option', { name: `${demandeDeContact.age} ans` }).click();
				await modale.getByRole('combobox', { name: 'Localisation' }).fill('par');
				await modale.getByRole('listbox', { name: 'Localisation' })
					.getByRole('option', { name: demandeDeContact.commune })
					.click();
				await modale.getByRole('textbox', { name: 'Commentaires' }).fill(demandeDeContact.commentaire);
				await modale.getByRole('button', { name: 'Envoyer mes informations afin d‘être rappelé(e)' }).click();

				const request = await demandeDeContactEnvoyee;
				await expect(request.method()).toEqual('POST');
				await expect(request.url()).toMatch(/\/api\/etablissements-accompagnement\/contact$/);
				await expect(request.postDataJSON()).toMatchObject({
					...demandeDeContact,
					établissement: {
						email: etablissement.email,
						nom: etablissement.nom,
						type: etablissement.type,
					},
				});
				// FIXME (GAFI 19-12-2023): 2 `<h1>` dans la page (1 dans la modale, 1 derrière)
				await expect(modale.getByRole('heading', { level: 1 })).toHaveText('Votre demande a bien été transmise !');

				await page.getByRole('button', { name: 'Fermer' }).first().click();

				await expect(modale).not.toBeVisible();
			});
		});
		test.describe('quand l‘utilisateur n‘écrit rien et fait une recherche', () => {
			test('affiche un text indiquant qu‘il faut saisir une localisation', async ({ page }) => {
				await page.getByRole('button', { name: 'Rechercher' }).click();
				await expect(page.getByText('Veuillez sélectionner une option dans la liste')).toBeVisible();
			});
		});
	});

	test.describe('quand l‘utilisateur ajoute des paramètre incorrecte à la query', () => {
		test('affiche le message "Erreur - Demande incorrecte"', async ({ page }) => {
			const queries = {
				'aa-invalid-query': 'invalid',
				codeCommune: '46102',
				libelleCommune: 'Figeac (46100)',
			};
			await page.goto(`/accompagnement?${stringify(queries)}`);

			// FIXME (GAFI 19-12-2023): Devrait être un titre ?
			const error = page.getByText('Erreur - Demande incorrecte');
			await expect(error).toBeVisible();
		});
	});
});

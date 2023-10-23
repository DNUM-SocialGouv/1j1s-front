/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

import { stringify } from 'querystring';

import { aBarmanOffre, aRésultatEchantillonOffre } from '~/server/offres/domain/offre.fixture';

import { interceptGet } from '../interceptGet';

describe('Page de recherche d’emplois', () => {
	beforeEach(() => {
		cy.viewport('iphone-x');
		cy.intercept(
			'/api/emplois*',
			aRésultatEchantillonOffre(),
		).as('recherche-emplois');
	});

	context('Parcours standard', () => {
		it('affiche 15 résultats par défaut', () => {
			cy.visit('/emplois');
			cy.wait('@recherche-emplois');

			cy.findByRole('list', { name: /Offres d‘emplois/i })
				.children()
				.should('have.length', 15);
			cy.findByRole('list', { name: /Offres d‘emplois/i })
				.children()
				.first()
				.should('contain.text', 'Barman / Barmaid (H/F)');
		});

		it('place le focus sur le premier input du formulaire de recherche', () => {
			cy.visit('/emplois');
			cy.wait('@recherche-emplois');

			cy.findByRole('textbox', { name: /Métier, mot-clé/i }).should('have.focus');
		});

		context('quand l‘utilisateur rentre un mot clé', () => {
			it('filtre les résultats par mot clé', () => {
				cy.visit('/emplois');
				cy.wait('@recherche-emplois');

				cy.findByRole('textbox', { name: /Métier, mot-clé/i }).type('barman'),
				interceptGet({
					actionBeforeWaitTheCall: () =>
						cy.findByRole('button', { name: /Rechercher/i }).click(),
					alias: 'recherche-emplois',
					path: '/api/emplois*',
					response: JSON.stringify({ nombreRésultats: 1, résultats: [aBarmanOffre()] }),
				});

				cy.findByRole('list', { name: /Offres d‘emplois/i }).children().should('have.length', 1);
			});
		});

		context('quand l‘utilisateur veut sélectionner la première offre', () => {
			it('navigue vers le détail de l‘offre', () => {
				cy.visit('/emplois');
				cy.wait('@recherche-emplois');

				const id = aBarmanOffre().id;

				interceptGet({
					actionBeforeWaitTheCall: () => (
						cy.findByRole('list', { name: /Offres d‘emplois/i })
							.children()
							.first()
							.click()
					),
					alias: 'get-emplois',
					path: `/_next/data/*/emplois/${id}.json?id=${id}`,
					response: JSON.stringify({ pageProps: { offreEmploi: aBarmanOffre() } }),
				});

				cy.findByRole('heading', { level: 1 }).should('contain.text', 'Barman / Barmaid (H/F)');
			});
		});
	});

	context('quand l’utilisateur arrive sur la page avec une recherche déjà renseignée', () => {
		it('rempli le formulaire avec la recherche', () => {
			const query = {
				codeLocalisation: '75',
				experienceExigence: 'E',
				grandDomaine: 'B',
				motCle: 'Informatique',
				nomLocalisation: 'Paris',
				tempsDeTravail: 'tempsPartiel',
				typeDeContrats: 'CDI',
				typeLocalisation: 'DEPARTEMENT',
			};
			cy.visit(`/emplois?${stringify(query)}`);
			cy.wait('@recherche-emplois');

			cy.findByRole('textbox', { name: /Métier, Mot-clé/i }).should('have.value', 'Informatique');
			cy.findByRole('combobox', { name: /Localisation/i }).should('have.value', 'Paris (75)');

			cy.findByRole('button', { name: /Filtrer ma recherche/i }).click();

			cy.findByRole('checkbox', { name: /Contrat à durée indéterminé/i }).should('be.checked');
			cy.findByText(summary(/Temps de travail/i)).click();
			cy.findByRole('radio', { name: /Temps partiel/i }).should('be.checked');
			cy.findByText(summary(/Niveau demandé/i)).click();
			cy.findByRole('radio', { name: /Plus de 3 ans/i }).should('be.checked');
			cy.findByText(summary(/Domaine/i)).click();
			cy.findByRole('checkbox', { name: /Arts \/ Artisanat d‘art/i }).should('be.checked');
		});
	});

	context('quand les paramètres de l’url ne respectent pas le schema de validation du controller', () => {
		it('retourne une erreur de demande incorrecte', () => {
			interceptGet({
				actionBeforeWaitTheCall: () => cy.visit('/emplois?page=67'),
				alias: 'recherche-emplois-failed',
				path:'/api/emplois?page=67',
				response: JSON.stringify({ error: "les paramètres dans l'url ne respectent pas le schema de validation" }),
				statusCode: 400,
			});

			cy.findByText('Erreur - Demande incorrecte').should('exist');
		});
	});
});

// NOTE (GAFI 08-08-2023): summary n'a pas de role mais est intéractif :(
//	cf. https://w3c.github.io/html-aria/#el-summary
function summary(expectedContent: string | RegExp) {
	return function summary(content: string, element: Element | null): boolean {
		return Boolean(element?.tagName === 'SUMMARY' && content.match(expectedContent));
	};
}

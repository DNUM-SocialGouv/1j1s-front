/// <reference types="cypress" />

import { aRésultatRechercherMultipleAlternance } from '../../src/server/alternances/domain/alternance.fixture';
import {
	aListeDeMetierLaBonneAlternance,
} from '../../src/server/alternances/infra/repositories/laBonneAlternance.fixture';
import { aBarmanOffre, aRésultatEchantillonOffre } from '../../src/server/offres/domain/offre.fixture';
import { interceptGet } from '../interceptGet';

describe.skip('Parcours alternance PE', () => {
	beforeEach(() => {
		cy.viewport('iphone-x');
		interceptGet({
			actionBeforeWaitTheCall: () => cy.visit('/apprentissage'),
			alias: 'recherche-alternances',
			path: '/api/alternances*',
			response: JSON.stringify(aRésultatEchantillonOffre()),
		});
	});

	it('affiche 15 résultats par défaut', () => {
		cy.get('ul[aria-label="Offres d’alternances"] > li').should('have.length', 15);
		cy.get('ul[aria-label="Offres d’alternances"] > li').should('contain.text', 'Barman / Barmaid (H/F)');
	});

	it('place le focus sur le premier input du formulaire de recherche', () => {
		cy.focused().should('have.attr', 'name', 'motCle');
	});

	context('quand l\'utilisateur rentre un mot clé', () => {
		it('filtre les résultats par mot clé', () => {
			interceptGet({
				actionBeforeWaitTheCall: () => cy.focused().type('barman', { force: true }).type('{enter}'),
				alias: 'recherche-mot-cle-alternances',
				path: '/api/alternances*',
				response: JSON.stringify({ nombreRésultats: 1, résultats: [aBarmanOffre()] }),
			});

			cy.get('ul[aria-label="Offres d’alternances"] > li').should('have.length', 1);
		});

		context('quand l\'utilisateur veut sélectionner la première offre', () => {
			it('navigue vers le détail de l\'offre', () => {
				const id = aBarmanOffre().id;

				interceptGet({
					actionBeforeWaitTheCall: () => cy.get('ul[aria-label="Offres d’alternances"] > li a').first().click(),
					alias: 'get-emplois',
					path: `/_next/data/*/emplois/${id}.json?id=${id}`,
					response: JSON.stringify({ pageProps: { offreEmploi: aBarmanOffre() } }),
				});

				cy.get('h1').should('contain.text', 'Barman / Barmaid (H/F)');
			});
		});
	});
});

context("quand les paramètres de l'url ne respectent pas le schema de validation du controller", () => {
	it('retourne une erreur de demande incorrecte', () => {
		cy.viewport('iphone-x');

		interceptGet({
			actionBeforeWaitTheCall: () => cy.visit('/apprentissage?page=67'),
			alias: 'recherche-alternances-failed',
			path:'/api/alternances?page=67',
			response: JSON.stringify({ error: "les paramètres dans l'url ne respectent pas le schema de validation" }),
			statusCode: 400,
		});
		cy.contains('Erreur - Demande incorrecte').should('exist');
	});
});

describe('Parcours alternance LBA', () => {
	beforeEach(() => {
		cy.viewport('iphone-x');
	});

	it('affiche 0 résultats par défaut', () => {
		cy.visit('/apprentissage');
		cy.get('ul[aria-label="Offres d’alternances"] > li').should('have.length', 0);
	});

	it('place le focus sur le premier input du formulaire de recherche', () => {
		cy.visit('/apprentissage');
		cy.focused().should('have.attr', 'name', 'libelle');
	});

	describe('Quand l’utilisateur effectue une recherche', () => {
		it('filtre les résultats par mot clé', () => {
			cy.visit('/apprentissage');

			interceptGet({
				actionBeforeWaitTheCall: () => cy.focused().type('boulang'),
				alias: 'recherche-metiers',
				path: '/api/alternances/*',
				response: JSON.stringify(aListeDeMetierLaBonneAlternance()),
			});
			cy.focused().type('{enter}');

			interceptGet({
				actionBeforeWaitTheCall: () => cy.focused().type('{enter}'),
				alias: 'recherche-alternances',
				path: '/api/alternances*',
				response: JSON.stringify(aRésultatRechercherMultipleAlternance()),
			});

			cy.get('ul[aria-label="Offres d’alternances"] > li').should('have.length', 4);
		});
	});
});

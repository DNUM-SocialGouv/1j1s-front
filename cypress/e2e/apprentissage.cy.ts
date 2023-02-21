/// <reference types="cypress" />

import {
	aRésultatRechercherMultipleAlternance,
} from '~/server/alternances/domain/alternance.fixture';
import {
	aListeDeMetierLaBonneAlternance,
} from '~/server/metiers/domain/métier.fixture';

import { interceptGet } from '../interceptGet';


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
		cy.focused().should('have.attr', 'name', 'libelleMetier');
	});

	describe('Quand l’utilisateur cherche un métier', () => {
		const aListeDeMetierLaBonneAlternanceFixture = aListeDeMetierLaBonneAlternance();
		it('tous les métiers sont accessibles mais au maximum 10 sont visibles sans scroll', () => {
			cy.visit('/apprentissage');
			interceptGet({
				actionBeforeWaitTheCall: () => cy.focused().type('travaux', { force: true }),
				alias: 'recherche-mot-cle-alternances',
				path: '/api/metiers*',
				response: JSON.stringify(aListeDeMetierLaBonneAlternanceFixture),
			});

			cy.contains(aListeDeMetierLaBonneAlternanceFixture[0].label).should('be.visible');
			cy.contains(aListeDeMetierLaBonneAlternanceFixture[10].label).should('not.be.visible');
			cy.get('ul[role="listbox"] > li').should('have.length', 11);
		});
	});

	describe('Quand l’utilisateur effectue une recherche', () => {
		it('filtre les résultats par mot clé', () => {
			interceptGet({
				actionBeforeWaitTheCall: () => cy.visit('/apprentissage' + '?libelleMetier=Boulangerie%2C+pâtisserie%2C+chocolaterie&codeRomes=D1102%2CD1104&libelleCommune=Gignac-la-Nerthe+%2813180%29&codeCommune=13043&latitudeCommune=48.859&longitudeCommune=2.347&distanceCommune=10'),
				alias: 'recherche-metiers',
				path: '/api/alternances?libelleMetier*',
				response: JSON.stringify(aRésultatRechercherMultipleAlternance()),
			});

			cy.get('ul[aria-label="Offres d’alternances"] > li').should('have.length', 4);
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

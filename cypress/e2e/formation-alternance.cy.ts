/// <reference types="cypress" />

import { aRésultatFormation } from '~/server/formations/domain/formation.fixture';
import {
	aListeDeMetierLaBonneAlternance,
} from '~/server/metiers/domain/métier.fixture';

import { interceptGet } from '../interceptGet';


describe('Parcours formation LBA', () => {
	beforeEach(() => {
		cy.viewport('iphone-x');
	});

	it('affiche 0 résultats par défaut', () => {
		cy.visit('/formations/apprentissage');
		cy.get('ul[aria-label="Formations en alternance"] > li').should('have.length', 0);
	});

	it('place le focus sur le premier input du formulaire de recherche', () => {
		cy.visit('/formations/apprentissage');
		cy.focused().should('have.attr', 'name', 'libelleMetier');
	});

	describe('Quand l’utilisateur cherche un métier', () => {
		const aListeDeMetierLaBonneAlternanceFixture = aListeDeMetierLaBonneAlternance();
		it('tous les métiers sont accessibles mais au maximum 10 sont visibles sans scroll', () => {
			cy.visit('/formations/apprentissage');
			interceptGet({
				actionBeforeWaitTheCall: () => cy.focused().type('travaux', { force: true }),
				alias: 'recherche-mot-cle',
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
				actionBeforeWaitTheCall: () => cy.visit('/formations/apprentissage' + '?libelleMetier=Boulangerie%2C+pâtisserie%2C+chocolaterie&codeRomes=D1102%2CD1104'),
				alias: 'recherche-metiers',
				path: '/api/formations*',
				response: JSON.stringify(aRésultatFormation()),
			});

			cy.get('ul[aria-label="Formations en alternance"] > li').should('have.length', 2);
		});
	});
});

context("quand les paramètres de l'url ne respectent pas le schema de validation du controller", () => {
	it('retourne une erreur de demande incorrecte', () => {
		cy.viewport('iphone-x');

		interceptGet({
			actionBeforeWaitTheCall: () => cy.visit('/formations/apprentissage?page=67'),
			alias: 'recherche-formations-failed',
			path:'/api/formations?page=67',
			response: JSON.stringify({ error: "les paramètres dans l'url ne respectent pas le schema de validation" }),
			statusCode: 400,
		});
		cy.contains('Erreur - Demande incorrecte').should('exist');
	});
});

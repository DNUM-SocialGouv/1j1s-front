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
			actionBeforeWaitTheCall: () => cy.visit('/formations/apprentissage?libelleMetier=Electronique%2C+informatique+industrielle&codeRomes=H1206%2CH1402%2CH2502%2CI1102%2CH1208%2CH1502%2CH1209%2CH1504%2CI1305%2CI1304%2CI1302%2CH2501%2CH2603%2CH2604%2CH2605&libelleCommune=Paris+20e+Arrondissement+%2875020%29&codeCommune=&latitudeCommune=48.863367&longitudeCommune=2.397152&distanceCommune=10&unwanted-query=not-allowed'),
			alias: 'recherche-formations-failed',
			path:'/api/formations?*',
			response: JSON.stringify({ error: "les paramètres dans l'url ne respectent pas le schema de validation" }),
			statusCode: 400,
		});
		cy.contains('Erreur - Demande incorrecte').should('exist');
	});
});

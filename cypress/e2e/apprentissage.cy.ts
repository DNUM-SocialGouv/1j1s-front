/// <reference types="cypress" />

import {
	aRésultatRechercherMultipleAlternance,
} from '../../src/server/alternances/domain/alternance.fixture';
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
		cy.focused().should('have.attr', 'name', 'libelle');
	});

	describe('Quand l’utilisateur effectue une recherche', () => {
		it('filtre les résultats par mot clé', () => {
			interceptGet({
				actionBeforeWaitTheCall: () => cy.visit('/apprentissage' + '?libelle=Boulangerie%2C+pâtisserie%2C+chocolaterie&codeRomes=D1102%2CD1104'),
				alias: 'recherche-metiers',
				path: '/api/alternances?libelle*',
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

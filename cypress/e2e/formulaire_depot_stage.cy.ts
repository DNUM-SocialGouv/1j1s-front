/// <reference types="cypress" />

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
describe('Dépôt de Stage', () => {
	describe('quand l’utilisateur arrive sur la page de l’étape 2 sans avoir rempli l’étape 1', () => {
		it('redirige vers l’étape 1', () => {
			cy.clearLocalStorage();
			cy.visit('/stages/deposer-offre/votre-offre-de-stage');

			cy.url().should('include', '/stages/deposer-offre');
			cy.url().should('not.include', 'votre-offre-de-stage');
		});
	});
});

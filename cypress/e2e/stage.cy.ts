/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
import stageNonFiltreeResponse from '../fixture/annonces/stageNonFiltreeMeilisearcheResponse.fixture.json';

describe('Parcours logement', () => {
	beforeEach(() => {
		cy.viewport('iphone-x');
		cy.visit('/stages');
	});

	context('quand on arrive sur la page de recherche de stages', () => {
		describe('quand on fait une recherche par domaines', () => {
			it('affiche les domaines par ordre alphabétique avec non renseigné en dernier element', () => {
				cy.intercept({ pathname: '/multi-search' }, stageNonFiltreeResponse);

				cy.findByRole('button', { name: 'Domaines' }).click();

				cy.get('ul > li[role="option"]').first().should('contain.text', 'Achats');
				cy.get('ul > li[role="option"]').eq(1).should('contain.text', 'Production');
				cy.get('ul > li[role="option"]').eq(2).should('contain.text', 'Travaux');
				cy.get('ul > li[role="option"]').last().should('contain.text', 'Non renseigné');
			});
		});
	});
});

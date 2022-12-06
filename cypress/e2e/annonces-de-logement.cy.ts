import emptyLogementResponse from '../fixture/annonces/emptyLogementMeilisearchResponse.fixture.json';
import logementFiltreeResponse from '../fixture/annonces/logementFiltreeMeilisearchResponse.fixture.json';
import logementNonFiltreeResponse from '../fixture/annonces/logementNonfiltreeMeilisearchResponse.fixture.json';

describe('Parcours logement', () => {
  beforeEach(() => {
    cy.viewport('iphone-6');
    cy.visit('/annonces');
  });

  context('quand on arrive sur la page des annonces de logement', () => {
    describe('quand il y a des annonces', () => {
	  it("affiche le résultat du nombre d'annonces de logements", () => {
        cy.intercept('http://localhost:7700/indexes/annonce-de-logement/search', logementNonFiltreeResponse);

        cy.contains('h2', '4 annonces pour étudiants');
	  });

	  it("affiche une liste d'annonces de logement par défaut", () => {
        cy.intercept('http://localhost:7700/indexes/annonce-de-logement/search', logementNonFiltreeResponse);

        cy.get('ol > li').should('have.length', 4);
	  });
    });

    describe('quand on fait une recherche par vile', () => {
	  it("filtre le nombre d'annonces", () => {
        cy.intercept('http://localhost:7700/indexes/annonce-de-logement/search', logementNonFiltreeResponse);
        cy.intercept('post','http://localhost:7700/indexes/annonce-de-logement/search', logementFiltreeResponse);

        cy.get('input').type('par');

        cy.get('ol > li').should('have.length', 2);
	  });
    });

    describe("quand il n'y a pas d'annonces", () => {
	  it("affiche un message d'erreur avec 0 résultats", () => {

        cy.intercept('http://localhost:7700/indexes/annonce-de-logement/search', emptyLogementResponse);
        cy.contains('p', '0 résultat');
	  });
  	});
  });
});

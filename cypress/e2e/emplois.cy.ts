/* eslint-disable jest/expect-expect */
import { aBarmanOffre, aRésultatEchantillonOffre } from '@tests/fixtures/domain/offre.fixture';

describe('Parcours emplois', () => {
  before(() => {
    cy.viewport('iphone-6');
    cy.visit('/emplois');
  });
  it('affiche 15 résultats par défaut', () => {
    cy.intercept('/api/emplois', aRésultatEchantillonOffre());
    cy.get('ul[aria-label="Offres d\'emplois"] > li').should('have.length', 15);
  });
  it('place le focus sur le premier input du formulaire de recherche', () => {
    cy.focused().should('have.attr', 'name', 'motCle');
  });
  context('quand l\'utilisateur rentre un mot clé', () => {
    it('filtre les résultats par mot clé', () => {
      cy.intercept({
        pathname: '/api/emplois',
        query: { motCle: 'barman' },
      }, { nombreRésultats: 1, résultats: [aBarmanOffre()] });
      cy.focused().type('barman').type('{enter}');

      cy.get('ul[aria-label="Offres d\'emplois"] > li').should('have.length', 1);
    });
    context('quand l\'utilisateur veut sélectionner la première offre', () => {
      it('navigue vers le détail de l\'offre', () => {
        const id = aBarmanOffre().id;
        cy.intercept(`/_next/data/development/emplois/${id}.json?id=${id}`, {
          pageProps: { offreEmploi: aBarmanOffre() },
        });
        cy.get('ul[aria-label="Offres d\'emplois"] > li a').first().click();
      });
    });
  });
});

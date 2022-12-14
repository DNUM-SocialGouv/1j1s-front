/// <reference types="cypress" />

import { aBarmanOffre, aRésultatEchantillonOffre } from '~/server/offres/domain/offre.fixture';

describe('Parcours emplois', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
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

  context("quand les paramètres de l'url ne respectent pas le schema de validation du controller", () => {
    beforeEach(() => {
      cy.viewport('iphone-x');
      cy.visit('/emplois?page=67');
    });

    it('retourne une erreur de demande incorrecte', () => {
      cy.contains('Erreur - Demande incorrecte').should('exist');
    });
  });
});

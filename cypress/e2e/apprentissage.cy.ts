/// <reference types="cypress" />

import { aBarmanOffre, aRésultatEchantillonOffre } from '../../src/server/offres/domain/offre.fixture';

describe('Parcours alternance', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
    cy.visit('/apprentissage');
  });

  it('affiche 15 résultats par défaut', () => {
    cy.intercept('/api/alternances', aRésultatEchantillonOffre());
    cy.get('ul[aria-label="Offres d’alternances"] > li').should('have.length', 15);
  });

  it('place le focus sur le premier input du formulaire de recherche', () => {
    cy.focused().should('have.attr', 'name', 'motCle');
  });

  context('quand l\'utilisateur rentre un mot clé', () => {
    it('filtre les résultats par mot clé', () => {
      cy.intercept({
        pathname: '/api/alternances',
        query: { motCle: 'barman' },
      }, { nombreRésultats: 1, résultats: [aBarmanOffre()] });
      cy.focused().type('barman').type('{enter}');

      cy.get('ul[aria-label="Offres d’alternances"] > li').should('have.length', 1);
    });

    context('quand l\'utilisateur veut sélectionner la première offre', () => {
      it('navigue vers le détail de l\'offre', () => {
        const id = aBarmanOffre().id;
        cy.intercept(`/_next/data/development/apprentissage/${id}.json?id=${id}`, {
          pageProps: { offreAlternance: aBarmanOffre() },
        });
        cy.get('ul[aria-label="Offres d’alternances"] > li a').first().click();
      });
    });
  });

  context("quand les paramètres de l'url ne respectent pas le schema de validation du controller", () => {
    beforeEach(() => {
      cy.viewport('iphone-x');
      cy.visit('/apprentissage?page=67');
    });

    it('retourne une erreur de demande incorrecte', () => {
      cy.contains('Erreur - Demande incorrecte').should('exist');
    });
  });
});

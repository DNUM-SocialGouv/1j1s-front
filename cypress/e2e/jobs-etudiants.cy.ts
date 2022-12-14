/// <reference types="cypress" />

import { aBarmanOffre, aRésultatEchantillonOffre } from '../../src/server/offres/domain/offre.fixture';

describe('Parcours jobs étudiants', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
    cy.visit('/jobs-etudiants');
  });

  it('affiche 15 résultats par défaut', () => {
    cy.intercept('/api/jobs-etudiants', aRésultatEchantillonOffre());
    cy.get('ul[aria-label="Offres de jobs étudiants"] > li').should('have.length', 15);
  });

  it('place le focus sur le premier input du formulaire de recherche', () => {
    cy.focused().should('have.attr', 'name', 'motCle');
  });

  context('quand l\'utilisateur rentre un mot clé', () => {
    it('filtre les résultats par mot clé', () => {
      cy.intercept({
        pathname: '/api/jobs-etudiants',
        query: { motCle: 'barman' },
      }, { nombreRésultats: 1, résultats: [aBarmanOffre()] });
      cy.focused().type('barman').type('{enter}');

      cy.get('ul[aria-label="Offres de jobs étudiants"] > li').should('have.length', 1);
    });

    context('quand l\'utilisateur veut sélectionner la première offre', () => {
      it('navigue vers le détail de l\'offre', () => {
        const id = aBarmanOffre().id;
        cy.intercept(`/_next/data/development/jobs-etudiants/${id}.json?id=${id}`, {
          pageProps: { jobÉtudiant: aBarmanOffre() },
        });
        cy.get('ul[aria-label="Offres de jobs étudiants"] > li a').first().click();
      });
    });
  });

  context("quand les paramètres de l'url ne respectent pas le schema de validation du controller", () => {
    beforeEach(() => {
      cy.viewport('iphone-x');
      cy.visit('/jobs-etudiants?page=67');
    });

    it('retourne une erreur de demande incorrecte', () => {
      cy.contains('Erreur - Demande incorrecte').should('exist');
    });
  });
});

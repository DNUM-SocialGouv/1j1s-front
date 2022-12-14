/// <reference types="cypress" />

import { aRésultatRechercheMission } from '~/server/engagement/domain/missionEngagement.fixture';

describe('Parcours bénévolat', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
    cy.visit('/benevolat');
  });
  context('quand l‘utilisateur choisi un domaine', () => {
    it('affiche la liste des résultats', () => {
      cy.get('button').contains('Sélectionnez votre choix').click();
      cy.get('ul[role="listbox"]').first().click();

      cy.get('input[name="libelleCommune"]').type('paris');
      cy.get('ul[role="listbox"]').first().click();

      cy.get('button').contains('Rechercher').click();

      cy.intercept({ pathname: '/api/benevolats' }, aRésultatRechercheMission());

      cy.get('ul[aria-label="Offre pour le bénévolat"] > li a').should('have.length', 2);
    });
  });

  context('quand l‘utilisateur clique sur le premier élément de la liste', () => {
    it('navigue vers le détail de l‘offre', () => {
      cy.get('button').contains('Sélectionnez votre choix').click();
      cy.get('ul[role="listbox"]').first().click();

      cy.get('button').contains('Rechercher').click();

      const id = aRésultatRechercheMission().résultats[0].id;
      cy.intercept(`/_next/data/development/benevolat/${id}.json?id=${id}`, {
        pageProps: { missionEngagement: aRésultatRechercheMission().résultats[0] },
      });
      cy.get('ul[aria-label="Offre pour le bénévolat"] > li a').first().click();

      cy.get('h1').should('be.visible');
      cy.get('ul[aria-label="Caractéristiques de la mission"]').should('be.visible');
    });
  });
});

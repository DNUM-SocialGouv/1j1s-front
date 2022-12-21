/// <reference types="cypress" />

import { aBarmanOffre, aRésultatEchantillonOffre } from '~/server/offres/domain/offre.fixture';

import { interceptGet } from '../interceptGet';

describe('Parcours emplois', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
    interceptGet({
      actionBeforeWaitTheCall: () => cy.visit('/emplois'),
      alias: 'recherche-emplois' ,
      path: ' /api/emplois*',
      response: JSON.stringify(aRésultatEchantillonOffre()),
    });
  });

  it('affiche 15 résultats par défaut', () => {
    cy.get('ul[aria-label="Offres d\'emplois"] > li').should('have.length', 15);
    cy.get('ul[aria-label="Offres d\'emplois"] > li').first().should('contain.text', 'Barman / Barmaid (H/F)');
  });

  it('place le focus sur le premier input du formulaire de recherche', () => {
    cy.focused().should('have.attr', 'name', 'motCle');
  });

  context('quand l\'utilisateur rentre un mot clé', () => {
    it('filtre les résultats par mot clé', () => {
      interceptGet({
        actionBeforeWaitTheCall: () => cy.focused().type('barman', { force: true }).type('{enter}'),
        alias: 'recherche-emplois',
        path: '/api/emplois*',
        response: JSON.stringify({ nombreRésultats: 1, résultats: [aBarmanOffre()] }),
      });

      cy.get('ul[aria-label="Offres d\'emplois"] > li').should('have.length', 1);
    });
  });

  context('quand l\'utilisateur veut sélectionner la première offre', () => {
    it('navigue vers le détail de l\'offre', () => {
      const id = aBarmanOffre().id;

      interceptGet({
        actionBeforeWaitTheCall: () => cy.get('ul[aria-label="Offres d\'emplois"] > li a').first().click(),
        alias: 'get-emplois',
        path: `/_next/data/*/emplois/${id}.json?id=${id}`,
        response: JSON.stringify({ pageProps: { offreEmploi: aBarmanOffre() } }),
      });

      cy.get('h1').should('contain.text', 'Barman / Barmaid (H/F)');
    });
  });
});

context("quand les paramètres de l'url ne respectent pas le schema de validation du controller", () => {
  it('retourne une erreur de demande incorrecte', () => {
    interceptGet({
      actionBeforeWaitTheCall: () => cy.visit('/emplois?page=67'),
      alias: 'recherche-emplois-failed',
      path:'/api/emplois?page=67',
      response: JSON.stringify({ error: "les paramètres dans l'url ne respectent pas le schema de validation" }),
      statusCode: 400,
    });

    cy.contains('Erreur - Demande incorrecte').should('exist');
  });
});

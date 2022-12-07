/// <reference types="cypress" />

/***
 * DEVNOTE
 * il faut configurer votre .env avec
 * STRAPI_BASE_URL=http://127.0.0.1:1337/
 * STRAPI_URL_API=http://127.0.0.1:1337/api/
 * car cypress n'a pas accès au localhost:1337
 */

describe('Parcours formulaire cej', () => {
  beforeEach(() => {
    cy.viewport('iphone-6');
    cy.visit('/contrat-engagement-jeune');
  });
  it('clique sur le bouton qui affiche le formulaire de contact', () => {
    cy.get('button').contains('Je souhaite être contacté(e)').click();
  });
  context('quand l’utilisateur correctement remplie le formulaire', () => {
    it('affiche un message de succès', () => {

      cy.get('input[name="firstname"]').type('jean');
      cy.get('input[name="lastname"]').type('dupont');
      cy.get('input[type="email"]').type('jean.dupont@mail.com');
      cy.get('input[type="tel"]').type('0688552233');
      cy.get('button').contains('Sélectionnez votre choix').click();
      cy.get('ul[role="listbox"]').first().click();
      cy.get('input[name="ville"]').type('par');
      cy.get('ul[role="listbox"]').first().click();

      cy.get('button').contains('Envoyer la demande').click();

      cy.contains('Votre demande a bien été transmise !').should('be.visible');
    });
  });
});

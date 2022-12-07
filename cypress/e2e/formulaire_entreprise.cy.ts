/// <reference types="cypress" />

/***
 * DEVNOTE
 * il faut configurer votre .env avec
 * STRAPI_BASE_URL=http://127.0.0.1:1337/
 * STRAPI_URL_API=http://127.0.0.1:1337/api/
 * car cypress n'a pas accès au localhost:1337
 */
describe('Parcours formulaire entreprise', () => {
  before(() => {
    cy.viewport('iphone-6');
    cy.visit('/les-entreprises-s-engagent/inscription');
  });
  context('quand l’utilisateur remplit correctement le formulaire', () => {
    it('affiche un message de succès', () => {

      cy.get('input[name="companyName"]').type('octo');
      cy.get('input[name="companyPostalCode"]').type('paris');
      cy.get('ul[role="listbox"]').first().click();
      cy.get('input[name="companySiret"]').type('41816609600069');
      cy.get('input[name="companySector"]').type('admin');
      cy.get('ul[role="listbox"]').first().click();
      cy.get('button').contains('Exemple : 250 à 499 salariés').click();
      cy.get('ul[role="listbox"]').first().click();

      cy.get('button').contains('Suivant').click();

      cy.contains('Etape 2 sur 2').should('be.visible');

      cy.get('input[name="firstName"]').type('jean');
      cy.get('input[name="lastName"]').type('dupont');
      cy.get('input[name="email"]').type('jean.dupont@gmail.com');
      cy.get('input[name="job"]').type('rh');
      cy.get('input[name="phone"]').type('0199999999');

      cy.get('button').contains('Envoyer le formulaire').click();

      cy.contains('Félicitations, votre formulaire a bien été envoyé !').should('be.visible');
    });
  });
});

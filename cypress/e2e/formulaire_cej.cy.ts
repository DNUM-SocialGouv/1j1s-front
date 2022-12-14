/// <reference types="cypress" />

/***
 * DEVNOTE
 * il faut configurer votre .env avec
 * STRAPI_BASE_URL=http://127.0.0.1:1337/
 * STRAPI_URL_API=http://127.0.0.1:1337/api/
 * car cypress n'a pas accès au localhost:1337
 *
 * il faut utiliser le { force : true } parce que cypress ne peut pas remplir des champs pas visible
 */

describe('Parcours formulaire cej', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
    cy.visit('/contrat-engagement-jeune');
  });

  context('quand l’utilisateur correctement remplie le formulaire', () => {
    it('clique sur le bouton qui affiche le formulaire de contact', () => {
      cy.get('button').contains('Je souhaite être contacté(e)').click();
      cy.contains('J\'ai des questions sur le Contrat d\'Engagement Jeune et souhaite être rappelé').should('be.visible');
    });

    it('affiche un message de succès', () => {
      cy.get('button').contains('Je souhaite être contacté(e)').click({ force: true });

      cy.get('input[name="firstname"]').type('jean', { force: true });
      cy.get('input[name="lastname"]').type('dupont', { force: true });
      cy.get('input[type="email"]').type('jean.dupont@mail.com');
      cy.get('input[type="tel"]').type('0688552233');
      cy.get('button').contains('Sélectionnez votre choix').click();
      cy.get('ul[role="listbox"]').first().click();

      cy.get('input[name="ville"]').type('par');
      cy.intercept('GET', '/api/communes?q=par', {
        résultats: [
          {
            code: '75056',
            codePostal: '75006',
            coordonnées: {
              latitude: 48.859,
              longitude: 2.347,
            },
            libelle: 'Paris',
            ville: 'Paris',
          },
        ],
      }).as('communes');
      cy.wait('@communes');
      cy.get('ul[role="listbox"]').first().click();

      cy.intercept('POST', '/api/demandes-de-contact', {
        statusCode: 201,
      }).as('submit');
      cy.get('button').contains('Envoyer la demande').click();
      cy.wait('@submit').its('request.body').should('deep.equal', {
        age: 18,
        codePostal: '75006',
        email: 'jean.dupont@mail.com',
        nom: 'dupont',
        prénom: 'jean',
        type: 'CEJ',
        téléphone: '0688552233',
        ville: 'Paris',
      });

      cy.contains('Votre demande a bien été transmise !').should('be.visible');
    });
  });
});

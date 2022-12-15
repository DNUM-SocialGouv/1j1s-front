/// <reference types="cypress" />

/***
 * DEVNOTE
 * il faut configurer votre .env avec
 * STRAPI_BASE_URL=http://127.0.0.1:1337/
 * STRAPI_URL_API=http://127.0.0.1:1337/api/
 * car cypress n'a pas accès au localhost:1337
 */
describe('Parcours formulaire entreprise', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
    cy.visit('/les-entreprises-s-engagent/inscription');
  });
  context('quand l’utilisateur remplit correctement le formulaire', () => {
    it('affiche un message de succès', () => {

      cy.get('input[name="companyName"]').type('octo');

      cy.get('input[name="companyPostalCode"]').type('par');
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
      }).as('codepostal');
      cy.wait('@codepostal');
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

      cy.intercept('POST', '/api/entreprises', {
        statusCode: 201,
      }).as('submit');
      cy.get('button').contains('Envoyer le formulaire').click();
      cy.wait('@submit').its('request.body').should('deep.equal', {
        codePostal: '75006',
        email: 'jean.dupont@gmail.com',
        nom: 'dupont',
        nomSociété: 'octo',
        prénom: 'jean',
        secteur: 'public-administration',
        siret: '41816609600069',
        taille: 'small',
        travail: 'rh',
        téléphone: '0199999999',
        ville: 'Paris',
      });

      cy.contains('Félicitations, votre formulaire a bien été envoyé !').should('be.visible');
    });
  });
});

/// <reference types="cypress" />

import {
  anÉtablissementAccompagnementList,
} from '../../src/server/établissement-accompagnement/domain/ÉtablissementAccompagnement.fixture';

describe('Parcours Accompagnement', () => {

  describe('quand l‘utilisateur arrive sur la page sans paramètre', () => {
    beforeEach(() => {
      cy.viewport('iphone-x');
      cy.visit('/accompagnement');
    });

    describe('quand l‘utilisateur cherche une commune', () => {
      it('affiche 2 résultats en cas de réussite', () => {
        cy.get('input[name="libelleCommune"]').type('par');
        cy.get('ul[role="listbox"]').first().click();

        cy.get('button').contains('Sélectionnez votre choix').click();
        cy.get('ul[role="listbox"]').first().click();

        cy.intercept({
          pathname: '/api/etablissements-accompagnement',
        }, anÉtablissementAccompagnementList());
        cy.get('button').contains('Rechercher').click();

        cy.intercept({ pathname: '/api/etablissements-accompagnement' }, anÉtablissementAccompagnementList());
        cy.get('ul[aria-label="Établissements d‘accompagnement"] > li').should('have.length', 3);
      });
    });

    describe('quand l‘utilisateur n‘écrit rien et fait une recherche', () => {
      it('affiche un text indiquant qu‘il faut saisir une localisation', () => {
        cy.get('button').contains('Rechercher').click();
        cy.contains('Veuillez saisir une localisation');
      });
    });
  });


  describe('quand l‘utilisateur ajoute des paramètre incorrecte à la query', () => {
    beforeEach(() => {
      cy.viewport('iphone-x');
      cy.visit('/accompagnement?libelleCommune=Figeac+%2846100%29&codeCommune=46102&oui=non');
    });

    it('affiche le message "Erreur - Demande incorrecte"', () => {
      cy.visit('/accompagnement?libelleCommune=Figeac+%2846100%29&codeCommune=46102&oui=non');
      cy.contains('Erreur - Demande incorrecte').should('be.visible');
    });
  });
});

/// <reference types="cypress" />

import {
  FormulaireEngagement,
} from '~/client/components/features/LesEntreprisesSEngagent/Rejoignez/Inscription/Inscription';

const TITLE_ETAPE_1 = 'Les entreprises s‘engagent - Rejoignez la mobilisation ! - Étape 1 sur 2 | 1jeune1solution';
const TITLE_ETAPE_2 = 'Les entreprises s‘engagent - Rejoignez la mobilisation ! - Étape 2 sur 2 | 1jeune1solution';
const TITLE_VALIDEE = 'Les entreprises s‘engagent - Rejoignez la mobilisation ! - Formulaire envoyé | 1jeune1solution';

const expected: FormulaireEngagement = {
  codePostal: '75015',
  email: 'toto@email.com',
  nom: 'Tata',
  nomSociété: 'Octo',
  prénom: 'Toto',
  secteur: 'health-social',
  siret: '41816609600069',
  taille: 'xsmall',
  travail: 'RH',
  téléphone: '0122334455',
  ville: 'Paris 15e Arrondissement',
};

function remplirFormulaireEtape1() {
  cy.get('input[name="companyName"]').type('Octo');
  cy.get('input[name="companySiret"]').type('41816609600069');
  cy.get('input[name="companySector"]').type('Santé humaine et action sociale');
  cy.contains('Santé humaine et action sociale', { timeout: 10000 }).click();
  cy.contains('Exemple : 250 à 499 salariés').parent().click();
  cy.contains('20 à 49 salariés').click();
  cy.get('input[name="companyPostalCode"]').type('Paris');
  cy.contains('Paris 15e Arrondissement', { timeout: 10000 }).click();
}

describe('Inscription', () => {
  beforeEach(() => {
    cy.visit('/les-entreprises-s-engagent/inscription');
  });
  describe('quand l’utilisateur arrivent sur la page', () => {
    it('il voit afficher la première étape de formulaire', () => {
      cy.contains('Etape 1 sur 2').should('exist');
      cy.title().should('eq', TITLE_ETAPE_1);
    });
  });
  describe('quand l’utilisateur clique sur Suivant et qu’il a rempli tous les champs', () => {
    it('il passe à l’étape 2', () => {
      remplirFormulaireEtape1();
      cy.get('button[type="submit"]').click();
      cy.contains('Etape 2 sur 2').should('exist');
      cy.title().should('eq', TITLE_ETAPE_2);
    });
  });
  describe('puis passe à l’étape 2 et qu’il clique sur Retour', () => {
    it('il repasse à l’étape 1', () => {
      remplirFormulaireEtape1();
      cy.get('button[type="submit"]').click();
      cy.contains('Retour').click();
      cy.contains('Etape 1 sur 2').should('exist');
      cy.title().should('eq', TITLE_ETAPE_1);
    });
  });
  describe('quand l’utilisateur a rempli tous les champs et clique sur Envoyer le formulaire', () => {
    it('appelle l’api avec les valeurs du formulaire de l’étape 1 et 2 et affiche un message de succès à l’utilisateur', () => {
      remplirFormulaireEtape1();
      cy.get('button[type="submit"]').click();
      cy.get('input[name="firstName"]').type('Toto');
      cy.get('input[name="lastName"]').type('Tata');
      cy.get('input[name="email"]').type('toto@email.com');
      cy.get('input[name="job"]').type('RH');
      cy.get('input[name="phone"]').type('0122334455');
      cy.intercept('POST', '*', {
        statusCode: 201,
      }).as('submit');
      cy.get('button[type="submit"]').click();
      cy.wait('@submit').its('request.body').should('deep.equal', expected);
      cy.title().should('eq', TITLE_VALIDEE);
    });
  });
});

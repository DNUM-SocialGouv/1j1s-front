/// <reference types="cypress" />
import {
	aFormulaireEnvoyéPostedValue,
	aFormulaireÉtape1StoredValue,
	aFormulaireÉtape2StoredValue,
	aFormulaireÉtape3StoredValue,
} from '../../src/pages/stages/deposer-offre/Formulaire/StageDeposerOffre.fixture';
import { interceptPost } from '../interceptPost';

const FORMULAIRE_ETAPE_1_LABEL = 'formulaireEtape1';
const FORMULAIRE_ETAPE_2_LABEL = 'formulaireEtape2';
const FORMULAIRE_ETAPE_3_LABEL = 'formulaireEtape3';

describe('Dépôt de Stage', () => {
	beforeEach(() => {
		cy.clearAllSessionStorage();
		cy.clearAllLocalStorage();
	});

	describe('quand l’utilisateur arrive sur la page de l’étape 1', () => {
		beforeEach(() => {
			cy.visit('/je-recrute');
			cy.get('[href="/stages/deposer-offre"]').click();
		});
		describe('et qu‘il remplit le formulaire', () => {
			it('le redirige vers l’étape 2', () => {
				cy.get('input[name="nomEmployeur"]').type(aFormulaireÉtape1StoredValue().nomEmployeur);
				cy.get('input[name="emailEmployeur"]').type(aFormulaireÉtape1StoredValue().emailEmployeur);
				cy.get('textarea[name="descriptionEmployeur"]').type(aFormulaireÉtape1StoredValue().descriptionEmployeur);

				cy.get('button[type="submit"]').click();
				cy.url().should('include', '/stages/deposer-offre/votre-offre-de-stage');
			});
		});
	});

	describe('quand l’utilisateur arrive sur la page de l’étape 2', () => {
		describe('et qu‘il remplit le formulaire', () => {
			it('le redirige vers l’étape 3', () => {
				window.localStorage.setItem(FORMULAIRE_ETAPE_1_LABEL, String(aFormulaireÉtape1StoredValue()));

				cy.visit('/stages/deposer-offre/votre-offre-de-stage');

				cy.get('input[name="nomOffre"]').type(aFormulaireÉtape2StoredValue().nomOffre);
				cy.get('input[name="lienCandidature"]').type(aFormulaireÉtape2StoredValue().lienCandidature);
				cy.get('textarea[name="descriptionOffre"]').type(aFormulaireÉtape2StoredValue().descriptionOffre);
				cy.get('input[name="dateDebut"').type(aFormulaireÉtape2StoredValue().dateDebut);
				cy.get('button').contains('Sélectionnez une durée').click();
				cy.get('ul[role="listbox"]').first().click();

				cy.get('button[type="submit"]').click();
				cy.url().should('include', '/stages/deposer-offre/localisation');
			});
		});

		describe('et qu’il n’a pas rempli l’étape 1', () => {
			it('redirige vers l’étape 1', () => {
				cy.visit('/stages/deposer-offre/votre-offre-de-stage');

				cy.url().should('include', '/stages/deposer-offre');
				cy.url().should('not.include', 'votre-offre-de-stage');
			});
		});
	});

	describe('quand l’utilisateur arrive sur la page de l’étape 3', () => {
		describe('et qu‘il remplit le formulaire', () => {
			it('redirige vers la page de confirmation d’envoi', () => {
				window.localStorage.setItem(FORMULAIRE_ETAPE_1_LABEL, JSON.stringify(aFormulaireÉtape1StoredValue()));
				window.sessionStorage.setItem(FORMULAIRE_ETAPE_2_LABEL, JSON.stringify(aFormulaireÉtape2StoredValue()));

				cy.visit('/stages/deposer-offre/localisation');

				cy.get('input[placeholder="Exemple : France"]').type(aFormulaireÉtape3StoredValue().pays);
				cy.get('[role="option"]').click();
				cy.get('input[name="ville"]').type(aFormulaireÉtape3StoredValue().ville);
				cy.get('input[name="adresse"]').type(aFormulaireÉtape3StoredValue().adresse);
				cy.get('input[name="codePostal"').type(aFormulaireÉtape3StoredValue().codePostal);

				interceptPost({
					actionBeforeWaitTheCall:() => cy.get('button[type="submit"]').click(),
					alias: 'submit-form',
					path: '/api/stages',
					response: JSON.stringify({
						statusCode: 200,
					}),
					responseBodyToCheck: aFormulaireEnvoyéPostedValue(),
				});

				cy.url().should('include', '/stages/deposer-offre/confirmation-envoi');
			});
		});
		describe('et qu’il n’a pas rempli l’étape 1', () => {
			it('redirige vers l’étape 1', () => {
				window.localStorage.setItem(FORMULAIRE_ETAPE_1_LABEL, JSON.stringify(aFormulaireÉtape1StoredValue()));

				cy.visit('/stages/deposer-offre/localisation');

				cy.url().should('include', '/stages/deposer-offre');
				cy.url().should('not.include', 'votre-offre-de-stage');
			});
		});

		describe('et qu’il n’a pas rempli l’étape 2', () => {
			it('redirige vers l’étape 1', () => {
				window.sessionStorage.setItem(FORMULAIRE_ETAPE_2_LABEL, JSON.stringify(aFormulaireÉtape2StoredValue()));

				cy.visit('/stages/deposer-offre/localisation');

				cy.url().should('include', '/stages/deposer-offre');
				cy.url().should('not.include', 'votre-offre-de-stage');
			});
		});
	});

	describe('quand l’utilisateur arrive sur la page de confirmation d’envoi', () => {
		describe('et qu’il n’a pas rempli l’étape 1', () => {
			it('redirige vers l’étape 1', () => {
				cy.visit('/stages/deposer-offre/confirmation-envoi');

				window.localStorage.setItem(FORMULAIRE_ETAPE_1_LABEL, JSON.stringify(aFormulaireÉtape1StoredValue()));

				cy.url().should('include', '/stages/deposer-offre');
				cy.url().should('not.include', 'votre-offre-de-stage');
			});
		});
		describe('et qu’il n’a pas rempli l’étape 2', () => {
			it('redirige vers l’étape 1', () => {
				cy.visit('/stages/deposer-offre/confirmation-envoi');

				window.localStorage.setItem(FORMULAIRE_ETAPE_2_LABEL, JSON.stringify(aFormulaireÉtape2StoredValue()));

				cy.url().should('include', '/stages/deposer-offre');
				cy.url().should('not.include', 'votre-offre-de-stage');
			});
		});
		describe('et qu’il n’a pas rempli l’étape 3', () => {
			it('redirige vers l’étape 1', () => {
				cy.visit('/stages/deposer-offre/confirmation-envoi');

				window.localStorage.setItem(FORMULAIRE_ETAPE_3_LABEL, JSON.stringify(aFormulaireÉtape3StoredValue()));

				cy.url().should('include', '/stages/deposer-offre');
				cy.url().should('not.include', 'votre-offre-de-stage');
			});
		});
	});

});

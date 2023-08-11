/// <reference types="cypress" />
import {
	aFormulaireEnvoyePostedValue,
	aFormulaireEtapeEntreprise,
	aFormulaireEtapeLocalisation,
	aFormulaireEtapeStage,
} from '../../src/client/components/features/OffreDeStage/Déposer/StageDeposerOffre.fixture';
import { interceptPost } from '../interceptPost';

const FORMULAIRE_ETAPE_1_LABEL = 'formulaireEtape1';
const FORMULAIRE_ETAPE_2_LABEL = 'formulaireEtape2';

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
				cy.get('input[name="nomEmployeur"]').type(aFormulaireEtapeEntreprise().nomEmployeur);
				cy.get('input[name="emailEmployeur"]').type(aFormulaireEtapeEntreprise().emailEmployeur);
				cy.get('textarea[name="descriptionEmployeur"]').type(aFormulaireEtapeEntreprise().descriptionEmployeur);

				cy.get('button[type="submit"]').click();
				cy.url().should('include', '/stages/deposer-offre/votre-offre-de-stage');
			});
		});
	});

	describe('quand l’utilisateur arrive sur la page de l’étape 2', () => {
		describe('et qu’il n’a pas rempli l’étape 1', () => {
			it('redirige vers l’étape 1', () => {
				cy.visit('/stages/deposer-offre/votre-offre-de-stage');

				cy.url().should('include', '/stages/deposer-offre');
				cy.url().should('not.include', 'votre-offre-de-stage');
			});
		});

		describe('et qu‘il remplit le formulaire', () => {
			it('le redirige vers l’étape 3', () => {
				cy.visit('/stages/deposer-offre/votre-offre-de-stage', {
					onBeforeLoad(win: Cypress.AUTWindow) {
						win.localStorage.setItem(FORMULAIRE_ETAPE_1_LABEL, JSON.stringify(aFormulaireEtapeEntreprise()));
					},
				});
				// don't know why le premier input ne se remplit pas workaround l'appeler 2 fois
				cy.get('input').first().focus();
				cy.get('input').first().type(aFormulaireEtapeStage().nomOffre);
				cy.get('input[name="nomOffre"]').type(aFormulaireEtapeStage().nomOffre);
				cy.get('input[name="lienCandidature"]').type(aFormulaireEtapeStage().lienCandidature);
				cy.get('textarea[name="descriptionOffre"]').type(aFormulaireEtapeStage().descriptionOffre);
				cy.get('input[name="dateDeDebutMin"]').type(aFormulaireEtapeStage().dateDeDebutMin);
				cy.get('button').contains('Sélectionnez une durée').click();
				cy.get('ul[role="listbox"]').first().click();

				cy.get('button[type="submit"]').click();
				cy.url().should('include', '/stages/deposer-offre/localisation');
			});
		});
	});

	describe('quand l’utilisateur arrive sur la page de l’étape 3', () => {
		describe('et qu’il n’a pas rempli l’étape 1', () => {
			it('redirige vers l’étape 1', () => {
				cy.visit('/stages/deposer-offre/localisation', {
					onBeforeLoad(win: Cypress.AUTWindow) {
						win.sessionStorage.setItem(FORMULAIRE_ETAPE_2_LABEL, JSON.stringify(aFormulaireEtapeStage()));
					},
				});

				cy.url().should('include', '/stages/deposer-offre');
				cy.url().should('not.include', 'votre-offre-de-stage');
			});
		});

		describe('et qu’il n’a pas rempli l’étape 2', () => {
			it('redirige vers l’étape 1', () => {
				cy.visit('/stages/deposer-offre/localisation', {
					onBeforeLoad(win: Cypress.AUTWindow) {
						win.localStorage.setItem(FORMULAIRE_ETAPE_1_LABEL, JSON.stringify(aFormulaireEtapeEntreprise()));
					},
				});

				cy.url().should('include', '/stages/deposer-offre');
				cy.url().should('not.include', 'votre-offre-de-stage');
			});
		});

		describe('et qu‘il remplit le formulaire', () => {
			it('redirige vers la page de confirmation d’envoi', () => {
				cy.visit('/stages/deposer-offre/localisation', {
					onBeforeLoad(win: Cypress.AUTWindow) {
						win.localStorage.setItem(FORMULAIRE_ETAPE_1_LABEL, JSON.stringify(aFormulaireEtapeEntreprise()));
						win.sessionStorage.setItem(FORMULAIRE_ETAPE_2_LABEL, JSON.stringify(aFormulaireEtapeStage()));
					},
				});

				// don't know why le premier input ne se remplit pas workaround l'appeler 2 fois
				cy.get('input').first().focus();
				cy.get('input').first().type('France');
				cy.get('input[placeholder="Exemple : France"]').type('France');
				cy.get('[role="option"]').click();
				cy.get('input[name="ville"]').type(aFormulaireEtapeLocalisation().ville);
				cy.get('input[name="adresse"]').type(aFormulaireEtapeLocalisation().adresse);
				cy.get('input[name="codePostal"').type(aFormulaireEtapeLocalisation().codePostal);
				cy.get('input[name="region"]').type(aFormulaireEtapeLocalisation().region);
				cy.get('input[name="departement"').type(aFormulaireEtapeLocalisation().departement);

				interceptPost({
					actionBeforeWaitTheCall:() => cy.get('button[type="submit"]').click(),
					alias: 'submit-form',
					path: '/api/stages',
					response: JSON.stringify({
						statusCode: 200,
					}),
					responseBodyToCheck: aFormulaireEnvoyePostedValue(),
				});

				cy.url().should('include', '/stages/deposer-offre/confirmation-envoi');
			});
		});
	});

});

/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
import {
	aFormulaireEnvoyePostedValue,
	aFormulaireEtapeEntreprise,
	aFormulaireEtapeLocalisation,
	aFormulaireEtapeStage,
} from '../../src/client/components/features/OffreDeStage/Déposer/StageDeposerOffre.fixture';
import { interceptPost } from '../interceptPost';
import { createFailure } from '../../src/server/errors/either';
import { ErreurMetier } from '../../src/server/errors/erreurMetier.types';
import { HttpError } from '../../src/server/services/http/httpError';
import { AxiosError } from 'axios';
import { anHttpError } from '../../src/server/services/http/httpError.fixture';

const FORMULAIRE_ETAPE_1_LABEL = 'formulaireEtape1';
const FORMULAIRE_ETAPE_2_LABEL = 'formulaireEtape2';
const FORMULAIRE_ETAPE_3_LABEL = 'formulaireEtape3';

describe('Dépôt de Stage', () => {
	beforeEach(() => {
		cy.clearAllSessionStorage();
		cy.clearAllLocalStorage();
	});

	describe('quand l’utilisateur arrive sur la page de l’étape 3', () => {
		describe('et qu‘il remplit le formulaire', () => {
			it('et que l‘envoi est en echec, ouvre la modale d‘erreur', () => {
				cy.visit('/stages/deposer-offre/localisation', {
					onBeforeLoad(win: Cypress.AUTWindow) {
						win.localStorage.setItem(FORMULAIRE_ETAPE_1_LABEL, JSON.stringify(aFormulaireEtapeEntreprise()));
						win.sessionStorage.setItem(FORMULAIRE_ETAPE_2_LABEL, JSON.stringify(aFormulaireEtapeStage()));
						win.localStorage.setItem(FORMULAIRE_ETAPE_3_LABEL, JSON.stringify(aFormulaireEtapeLocalisation()));
					},
				});
				cy.intercept('POST','/api/stages', anHttpError(403)).as('depot-stage');

				cy.findByRole('button', { name: /Envoyer/i }).click();
				cy.wait('@depot-stage');


				cy.url().should('include', '/stages/deposer-offre/localisation');
			});
		});
	});
});

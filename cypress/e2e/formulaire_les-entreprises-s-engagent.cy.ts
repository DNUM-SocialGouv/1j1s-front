/// <reference types="cypress" />


import { interceptGet } from '../interceptGet';
import { interceptPost } from '../interceptPost';

const TITLE_ETAPE_1 = 'Les entreprises s‘engagent - Rejoignez la mobilisation ! - Étape 1 sur 2 | 1jeune1solution';
const TITLE_ETAPE_2 = 'Les entreprises s‘engagent - Rejoignez la mobilisation ! - Étape 2 sur 2 | 1jeune1solution';
const TITLE_VALIDEE = 'Les entreprises s‘engagent - Rejoignez la mobilisation ! - Formulaire envoyé | 1jeune1solution';


function remplirFormulaireEtape1() {
	cy.get('input[name="companyName"]').type('Octo', { force: true });
	cy.get('input[name="companySiret"]').type('41816609600069');
	cy.get('input[name="companySector"]').type('santé', { force: true });
	cy.get('ul[role="listbox"]').first().click();
	cy.contains('Exemple : 250 à 499 salariés').parent().click();
	cy.contains('20 à 49 salariés').click();

	interceptGet(
		{
			actionBeforeWaitTheCall: () => cy.get('input[name="companyPostalCode"]').type('paris', { force: true }),
			alias: 'recherche-communes',
			path: '/api/communes*',
			response: JSON.stringify({ résultats: [
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
			] } ),
		},
	);
	cy.get('ul[role="listbox"]').first().click();
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
			cy.get('input[name="firstName"]').type('Toto', { force: true });
			cy.get('input[name="lastName"]').type('Tata', { force: true });
			cy.get('input[name="email"]').type('toto@email.com');
			cy.get('input[name="job"]').type('RH');
			cy.get('input[name="phone"]').type('0122334455');

			interceptPost(
				{
					actionBeforeWaitTheCall: () => cy.get('button[type="submit"]').click(),
					alias: 'submit-form',
					path: '/api/entreprises',
					response: JSON.stringify({
						statusCode: 201,
					}),
					responseBodyToCheck: {
						codePostal: '75006',
						email: 'toto@email.com',
						nom: 'Tata',
						nomSociété: 'Octo',
						prénom: 'Toto',
						secteur: 'health-social',
						siret: '41816609600069',
						taille: 'xsmall',
						travail: 'RH',
						téléphone: '0122334455',
						ville: 'Paris',
					},
				},
			);

			cy.title().should('eq', TITLE_VALIDEE);
		});
	});
});

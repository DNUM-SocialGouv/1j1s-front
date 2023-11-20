/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

const TITLE_ETAPE_1 = 'Les entreprises s‘engagent - Rejoignez la mobilisation ! - Étape 1 sur 2 | 1jeune1solution';
const TITLE_ETAPE_2 = 'Les entreprises s‘engagent - Rejoignez la mobilisation ! - Étape 2 sur 2 | 1jeune1solution';
const TITLE_VALIDEE = 'Les entreprises s‘engagent - Rejoignez la mobilisation ! - Formulaire envoyé | 1jeune1solution';

function remplirFormulaireEtape1() {
	cy.intercept('/api/communes*', { body: { résultats: [
		{
			code: '75056',
			codePostal: '75006',
			coordonnées: {
				latitude: 48.859,
				longitude: 2.347,
			},
			libelle: 'Paris (75006)',
			ville: 'Paris',
		},
	] } }).as('recherche-communes');

	cy.findByRole('textbox', { name: /Nom de l’entreprise/i }).type('OCTO Technology');
	// FIXME (GAFI 06-11-2023): Devrait être role combobox
	cy.findByRole('textbox', { name: /Ville du siège social de l’entreprise/i }).type('paris');
	cy.wait('@recherche-communes');
	cy.findByRole('option', { name: /Paris \(75006\)/i }).click();
	cy.findByRole('textbox', { name: /SIRET/i }).type('41816609600069');
	// FIXME (GAFI 06-11-2023): Devrait être role combobox
	cy.findByRole('textbox', { name: /Secteur d’activité de l’entreprise/i }).type('santé');
	cy.findByRole('option', { name: /Santé humaine et action sociale/i }).click();
	// FIXME (GAFI 06-11-2023): Devrait être role combobox
	cy.findByRole('button', { name: /Taille de l’entreprise/i }).click();
	cy.findByRole('option', { name: /20 à 49 salariés/i }).click();
}

describe('Inscription', () => {
	beforeEach(() => {
		cy.visit('/les-entreprises-s-engagent/inscription');
	});
	describe('quand l’utilisateur arrive sur la page', () => {
		it('voit afficher la première étape de formulaire', () => {
			cy.contains('Étape 1 sur 2').should('exist');
			cy.title().should('eq', TITLE_ETAPE_1);
		});
	});
	describe('quand l‘utilisateur clique sur Suivant et qu’il a rempli tous les champs', () => {
		it('passe à l’étape 2', () => {
			remplirFormulaireEtape1();
			cy.findByRole('button', { name: /Suivant/i }).click();
			cy.findByText('Étape 2 sur 2').should('be.visible');
			cy.title().should('eq', TITLE_ETAPE_2);
		});
	});
	describe('puis passe à l’étape 2 et qu’il clique sur Retour', () => {
		it('repasse à l’étape 1 avec les champs toujours remplis', () => {
			remplirFormulaireEtape1();
			cy.findByRole('button', { name: /Suivant/i }).click();
			// FIXME (GAFI 06-11-2023): Devrait être un lien ?
			cy.findByRole('button', { name: /Retour/i }).click();
			cy.contains('Étape 1 sur 2').should('exist');
			cy.findByRole('textbox', { name: /Nom de l’entreprise/i }).should('have.value', 'OCTO Technology');
			cy.findByRole('textbox', { name: /SIRET/i }).should('have.value', '41816609600069');
			// FIXME (GAFI 06-11-2023): Devrait être role combobox
			cy.findByRole('textbox', { name: /Secteur d’activité de l’entreprise/i }).should('have.value', 'Santé humaine et action sociale');
			// FIXME (GAFI 06-11-2023): devrait être role combobox
			cy.findByRole('button', { name: /Taille de l’entreprise/i }).should('have.text', '20 à 49 salariés');
			// FIXME (GAFI 06-11-2023): Certains champs ne sont pas testés ...

			cy.title().should('eq', TITLE_ETAPE_1);
		});
	});
	describe('quand l’utilisateur a rempli tous les champs et clique sur Envoyer le formulaire', () => {
		it('appelle l’api avec les valeurs du formulaire de l’étape 1 et 2 et affiche un message de succès à l’utilisateur', () => {
			cy.intercept(
				{ method: 'POST', path: '/api/entreprises' },
				{ statusCode: 201 })
				.as('submit-form');

			remplirFormulaireEtape1();
			cy.findByRole('button', { name: /Suivant/i }).click();
			cy.findByRole('textbox', { name: /Prénom/i }).type('Jean');
			cy.findByRole('textbox', { name: /^Nom/i }).type('Bon');
			cy.findByRole('textbox', { name: /Fonction au sein de l’entreprise/i }).type('RH');
			cy.findByRole('textbox', { name: /Adresse e-mail de contact/i }).type('jean.bon@example.com');
			cy.findByRole('textbox', { name: /Numéro de téléphone de contact/i }).type('0122334455');
			cy.findByRole('button', { name: /Envoyer le formulaire/i }).click();

			cy.wait('@submit-form');
			cy.findByRole('heading', { level: 1 }).should('have.text', 'Félicitations, votre formulaire a bien été envoyé !');
			cy.title().should('eq', TITLE_VALIDEE);
		});
	});
});

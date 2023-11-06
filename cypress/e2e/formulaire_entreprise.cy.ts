/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

import { interceptGet } from '../interceptGet';
import { interceptPost } from '../interceptPost';

describe('Parcours formulaire entreprise', () => {
	beforeEach(() => {
		cy.viewport('iphone-x');
		cy.visit('/les-entreprises-s-engagent/inscription');
	});
	context('quand l’utilisateur remplit correctement le formulaire', () => {
		it('affiche un message de succès', () => {

			cy.findByRole('textbox', { name: /Nom de l’entreprise/i }).type('OCTO Technology');

			interceptGet(
				{
					// FIXME (GAFI 06-11-2023): Devrait être role combobox
					actionBeforeWaitTheCall: () => cy.findByRole('textbox', { name: /Ville du siège social de l’entreprise/i }).type('paris'),
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
							libelle: 'Paris (75006)',
							ville: 'Paris',
						},
					] } ),
				},
			);
			cy.findByRole('option', { name: /Paris \(75006\)/i }).first().click();

			cy.findByRole('textbox', { name: /SIRET/i }).type('41816609600069');
			// FIXME (GAFI 06-11-2023): Devrait être role combobox
			cy.findByRole('textbox', { name: /Secteur d’activité de l’entreprise/i }).type('admin');
			cy.findByRole('option', { name: /Administration publique/i }).click();
			// FIXME (GAFI 06-11-2023): Devrait être role combobox
			cy.findByRole('button', { name: /Taille de l’entreprise/i }).click();
			cy.findByRole('option', { name: /0 à 19 salariés/i }).click();

			cy.findByRole('button', { name: /Suivant/i }).click();

			// FIXME (GAFI 06-11-2023): Manque un accent sur le "E"
			cy.findByText('Etape 2 sur 2').should('be.visible');

			cy.findByRole('textbox', { name: /Prénom/i }).type('Jean');
			cy.findByRole('textbox', { name: /^Nom/i }).type('Dupont');
			cy.findByRole('textbox', { name: /Fonction au sein de l’entreprise/i }).type('RH');
			cy.findByRole('textbox', { name: /Adresse e-mail de contact/i }).type('jean.dupont@gmail.com');
			cy.findByRole('textbox', { name: /Numéro de téléphone de contact/i }).type('0199999999');

			interceptPost(
				{
					actionBeforeWaitTheCall: () => cy.findByRole('button', { name: /Envoyer le formulaire/i }).click(),
					alias: 'submit-form',
					path: '/api/entreprises',
					response: JSON.stringify({
						statusCode: 201,
					}),
					responseBodyToCheck: {
						codePostal: '75006',
						email: 'jean.dupont@gmail.com',
						nom: 'Dupont',
						nomSociété: 'OCTO Technology',
						prénom: 'Jean',
						secteur: 'public-administration',
						siret: '41816609600069',
						taille: 'xxsmall',
						travail: 'RH',
						téléphone: '0199999999',
						ville: 'Paris',
					},
				},
			);

			cy.findByRole('heading', { level: 1 }).should('have.text', 'Félicitations, votre formulaire a bien été envoyé !');
		});
	});
});

/// <reference types="cypress" />

import { interceptGet } from '../interceptGet';
import { interceptPost } from '../interceptPost';

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

			cy.get('input[name="companyName"]').type('octo', { force: true });

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
							libelle: 'Paris (75006)',
							ville: 'Paris',
						},
					] } ),
				},
			);
			cy.get('ul[role="listbox"] > li').first().click();

			cy.get('input[name="companySiret"]').type('41816609600069');
			cy.get('input[name="companySector"]').type('admin');
			cy.get('ul[role="listbox"] > li').first().click();
			cy.get('button').contains('Exemple : 250 à 499 salariés').click();
			cy.get('ul[role="listbox"] > li').first().click();

			cy.get('button').contains('Suivant').click();

			cy.contains('Etape 2 sur 2').should('be.visible');

			cy.get('input[name="firstName"]').type('jean');
			cy.get('input[name="lastName"]').type('dupont');
			cy.get('input[name="email"]').type('jean.dupont@gmail.com');
			cy.get('input[name="job"]').type('rh');
			cy.get('input[name="phone"]').type('0199999999');

			interceptPost(
				{
					actionBeforeWaitTheCall: () => cy.get('button').contains('Envoyer le formulaire').click(),
					alias: 'submit-form',
					path: '/api/entreprises',
					response: JSON.stringify({
						statusCode: 201,
					}),
					responseBodyToCheck: {
						codePostal: '75006',
						email: 'jean.dupont@gmail.com',
						nom: 'dupont',
						nomSociété: 'octo',
						prénom: 'jean',
						secteur: 'public-administration',
						siret: '41816609600069',
						taille: 'xxsmall',
						travail: 'rh',
						téléphone: '0199999999',
						ville: 'Paris',
					},
				},
			);

			cy.contains('Félicitations, votre formulaire a bien été envoyé !').should('be.visible');
		});
	});
});

/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

import { interceptGet } from '../interceptGet';
import { interceptPost } from '../interceptPost';

describe('Parcours formulaire cej', () => {
	beforeEach(() => {
		cy.viewport('iphone-x');
		cy.visit('/contrat-engagement-jeune');
	});

	context('quand l’utilisateur correctement remplie le formulaire', () => {
		it('clique sur le bouton qui affiche le formulaire de contact', () => {
			// FIXME (GAFI 23-10-2023): Mauvais point, ça devrait être un point médian
			cy.findByRole('button', { name: /Demander à être contacté\.e/i }).click();
			cy.findByRole('heading', {
				// FIXME (GAFI 23-10-2023): deuxième titre de niveau 1 sur la page ...
				level: 1,
				name: /J‘ai des questions sur le Contrat d‘Engagement Jeune et souhaite être rappelé/i,
			}).should('be.visible');
		});

		it('affiche un message de succès', () => {
			cy.findByRole('button', { name: /Demander à être contacté\.e/i }).click();

			cy.findByRole('textbox', { name: /Prénom/i }).should('have.focus');
			cy.findByRole('textbox', { name: /Prénom/i }).type('jean');
			cy.findByRole('textbox', { name: /^Nom/i }).type('dupont');
			cy.findByRole('textbox', { name: /Adresse email/i }).type('jean.dupont@mail.com');
			cy.findByRole('textbox', { name: /Téléphone/i }).type('0688552233');
			// FIXME (GAFI 23-10-2023): Manque un circonflèxe par ici ...
			cy.findByRole('button', { name: /^Age/i }).click();
			// FIXME (GAFI 23-10-2023): Idéalement récupérer avec cy.findByRole('listbox', { name: /Age/i }).children()
			//  À remplacer après fix du composant associé
			cy.findAllByRole('option').first().click();

			interceptGet(
				{
					actionBeforeWaitTheCall: () => cy.findByRole('textbox', { name: /Ville/i }).type('paris'),
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
					] }),
				},
			);
			// FIXME (GAFI 23-10-2023): Idéalement récupérer avec cy.findByRole('listbox', { name: /Ville/i }).children()
			//  À remplacer après fix du composant associé
			cy.findAllByRole('option').first().click();

			interceptPost(
				{
					actionBeforeWaitTheCall: () => cy.findByRole('button', { name: /Envoyer la demande/i }).click(),
					alias: 'submit-form',
					path: '/api/demandes-de-contact',
					response: JSON.stringify({
						statusCode: 201,
					}),
					responseBodyToCheck: {
						age: 16,
						codePostal: '75006',
						email: 'jean.dupont@mail.com',
						nom: 'dupont',
						prénom: 'jean',
						type: 'CEJ',
						téléphone: '0688552233',
						ville: 'Paris',
					},
				},
			);

			cy.findByText('Votre demande a bien été transmise !').should('be.visible');
		});
	});
});

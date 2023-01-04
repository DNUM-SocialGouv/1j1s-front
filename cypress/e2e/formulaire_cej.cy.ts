/// <reference types="cypress" />

/***
 * DEVNOTE
 * il faut configurer votre .env avec
 * STRAPI_BASE_URL=http://127.0.0.1:1337/
 * STRAPI_URL_API=http://127.0.0.1:1337/api/
 * car cypress n'a pas accès au localhost:1337
 *
 * il faut utiliser le { force : true } parce que cypress ne peut pas remplir des champs pas visible
 */

import communeList from '../fixture/communes/communeList.fixture.json';

describe('Parcours formulaire cej', () => {
	beforeEach(() => {
		cy.viewport('iphone-x');
		cy.visit('/contrat-engagement-jeune');

		cy.intercept({ pathname: '/api/communes' }, { body: communeList, statusCode: 200 });
	});

	context('quand l’utilisateur correctement remplie le formulaire', () => {
		it('clique sur le bouton qui affiche le formulaire de contact', () => {
			cy.get('button').contains('Je souhaite être contacté(e)').click();
			cy.contains('J‘ai des questions sur le Contrat d‘Engagement Jeune et souhaite être rappelé').should('be.visible');
		});

		it('affiche un message de succès', () => {
			cy.get('button').contains('Je souhaite être contacté(e)').click({ force: true });

			cy.get('input[name="firstname"]').type('jean', { force: true });
			cy.get('input[name="lastname"]').type('dupont', { force: true });
			cy.get('input[type="email"]').type('jean.dupont@mail.com');
			cy.get('input[type="tel"]').type('0688552233');
			cy.get('button').contains('Sélectionnez votre choix').click();
			cy.get('ul[role="listbox"]').first().click();
			cy.get('input[name="libelleCommune"]').last().type('par');
			cy.get('ul[role="listbox"]').first().click();

			cy.intercept({ method: 'POST', pathname: '/api/demandes-de-contact' }, { statusCode: 201 });
			cy.get('button').contains('Envoyer la demande').click();

			cy.get('h1')
				.contains('Votre demande a bien été transmise !').should('exist')
				.next().click();

			cy.get('dialog').should('not.exist');
		});
	});
});

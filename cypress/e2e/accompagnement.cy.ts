/// <reference types="cypress" />

import {
	aMissionLocaleÉtablissementAccompagnementList,
	anOrderedÉtablissementAccompagnementList,
} from '../../src/server/établissement-accompagnement/domain/ÉtablissementAccompagnement.fixture';
import { aCommuneList } from '../../src/server/localisations/domain/localisationAvecCoordonnées.fixture';
import communeList from '../fixture/communes/communeList.fixture.json';
import { interceptGet } from '../interceptGet';

describe('Parcours Accompagnement', () => {
	describe('quand l‘utilisateur arrive sur la page sans paramètre', () => {
		beforeEach(() => {
			cy.viewport('iphone-x');
			cy.visit('/accompagnement');

			cy.intercept({ pathname: '/api/communes' }, { body: communeList, statusCode: 200 });
		});

		describe('quand l‘utilisateur lance une recherche', () => {
			it('affiche les résultats de recherche', () => {
				interceptGet({
					actionBeforeWaitTheCall: () => cy.get('input[name="libelleCommune"]').type('par'),
					alias: 'recherche-commune',
					path: '/api/communes?q=par*',
					response: JSON.stringify({
						résultats: aCommuneList(),
					}),
				});
				cy.get('ul[role="listbox"]').first().click();

				cy.contains('Sélectionnez votre choix').click();
				cy.get('ul[role="listbox"] > li').first().click();

				interceptGet({
					actionBeforeWaitTheCall: () => cy.contains('Rechercher').click(),
					alias: 'recherche-accompagnement',
					path: '/api/etablissements-accompagnement*',
					response: JSON.stringify(anOrderedÉtablissementAccompagnementList()),
				});

				cy.get('ul[aria-label="Établissements d‘accompagnement"] > li').should('have.length', 3);
			});
		});

		describe('quand l‘utilisateur souhaite contacter un établissement d‘accompagnement', () => {
			it('permet d‘envoyer une demande de contact', () => {
				cy.intercept(
					'GET',
					'/api/communes?q=par*',
					JSON.stringify({ résultats: aCommuneList() }),
				).as('get-communes');

				cy.get('input[name="libelleCommune"]').type('par');
				cy.wait('@get-communes');
				cy.get('ul[role="listbox"] > li').first().click();

				cy.contains('button', 'Sélectionnez votre choix').click();
				cy.get('ul[role="listbox"] > li').first().click();

				cy.intercept(
					'GET',
					'/api/etablissements-accompagnement*',
					JSON.stringify(aMissionLocaleÉtablissementAccompagnementList()),
				).as('recherche-accompagnement');
				cy.contains('button', 'Rechercher').click();
				cy.wait('@recherche-accompagnement');

				cy.get('ul[aria-label="Établissements d‘accompagnement"] > li').should('have.length', 1);

				cy.contains('button', 'Je souhaite être contacté(e)').click();

				cy.get('input[name=firstname]').type('John', { force: true });
				cy.get('input[name=lastname]').type('Doe', { force: true });
				cy.get('input[name=mail]').type('john.doe@email.com');
				cy.get('input[name=phone]').type('0606060606');
				cy.contains('button', 'Sélectionnez votre choix').click();
				cy.get('ul[role="listbox"] > li').eq(7).click();

				interceptGet({
					actionBeforeWaitTheCall: () => cy.get('input[name="libelleCommune"]').last().type('par'),
					alias: 'recherche-commune',
					path: '/api/communes?q=par*',
					response: JSON.stringify({
						résultats: aCommuneList(),
					}),
				});

				cy.get('ul[role="listbox"]').first().click();
				cy.get('textarea[name=commentaire]').type('Merci de me recontacter');

				cy.intercept({ method: 'POST', pathname: '/api/etablissements-accompagnement/contact*' }, { statusCode: 201 });
				cy.contains('button', 'Envoyer mes informations afin d‘être rappelé(e)').click();

				cy.contains('h1', 'Votre demande a bien été transmise !')
					.should('exist')
					.next().click();

				cy.get('dialog').should('not.exist');
			});
		});

		describe('quand l‘utilisateur n‘écrit rien et fait une recherche', () => {
			it('affiche un text indiquant qu‘il faut saisir une localisation', () => {
				cy.get('button').contains('Rechercher').click();
				cy.contains('Veuillez saisir une localisation');
			});
		});
	});

	describe('quand l‘utilisateur ajoute des paramètre incorrecte à la query', () => {
		beforeEach(() => {
			cy.viewport('iphone-x');
			cy.visit('/accompagnement?libelleCommune=Figeac+%2846100%29&codeCommune=46102&oui=non');
		});

		it('affiche le message "Erreur - Demande incorrecte"', () => {
			cy.visit('/accompagnement?libelleCommune=Figeac+%2846100%29&codeCommune=46102&oui=non');
			cy.contains('Erreur - Demande incorrecte').should('be.visible');
		});
	});
});

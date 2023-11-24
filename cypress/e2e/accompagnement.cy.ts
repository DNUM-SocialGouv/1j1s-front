/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

import {
	aMissionLocaleÉtablissementAccompagnementList,
	anOrderedÉtablissementAccompagnementList,
} from '../../src/server/établissement-accompagnement/domain/etablissementAccompagnement.fixture';
import { aCommuneList } from '../../src/server/localisations/domain/localisationAvecCoordonnées.fixture';
import communeList from '../fixture/communes/communeList.fixture.json';
import { interceptGet } from '../interceptGet';

describe('Parcours Accompagnement', () => {
	describe('quand l‘utilisateur arrive sur la page sans paramètre', () => {
		beforeEach(() => {
			cy.viewport('iphone-x');
			cy.visit('/accompagnement');
		});

		describe('quand l‘utilisateur lance une recherche', () => {
			it('affiche les résultats de recherche', () => {
				cy.intercept(
					'GET',
					'/api/communes?q=*',
					JSON.stringify({ résultats: aCommuneList() }),
				).as('get-communes');

				cy.findByRole('combobox', { name: 'Localisation' }).type('par');
				cy.wait('@get-communes');
				cy.findByRole('listbox', { name: 'Localisation' })
					.within(() => cy.findAllByRole('option').first().click({force: true}));

				cy.findByRole('button', { name: 'Type d‘accompagnement' }).click();
				cy.findByRole('listbox')
					.within(() => cy.findAllByRole('option').first().click());

				interceptGet({
					actionBeforeWaitTheCall: () => cy.findByRole('button', { name: 'Rechercher' }).click(),
					alias: 'recherche-accompagnement',
					path: '/api/etablissements-accompagnement*',
					response: JSON.stringify(anOrderedÉtablissementAccompagnementList()),
				});

				cy.findByRole('list', { name: 'Établissements d‘accompagnement' })
					.children('li')
					.should('have.length', 3);
			});
		});

		describe('quand l‘utilisateur souhaite contacter un établissement d‘accompagnement', () => {
			it('permet d‘envoyer une demande de contact', () => {
				cy.intercept(
					'GET',
					'/api/communes?q=*',
					JSON.stringify({ résultats: aCommuneList() }),
				).as('get-communes');

				cy.findByRole('combobox', { name: 'Localisation' }).type('par');
				cy.wait('@get-communes');
				cy.findByRole('listbox', { name: 'Localisation' })
					.within(() => cy.findAllByRole('option').first().click());

				cy.findByRole('button', { name: 'Type d‘accompagnement' }).click();
				cy.findByRole('listbox')
					.within(() => cy.findAllByRole('option').first().click());

				cy.intercept(
					'GET',
					'/api/etablissements-accompagnement*',
					JSON.stringify(aMissionLocaleÉtablissementAccompagnementList()),
				).as('recherche-accompagnement');
				cy.findByRole('button', { name:'Rechercher' }).click();
				cy.wait('@recherche-accompagnement');

				cy.findByRole('list', { name: 'Établissements d‘accompagnement' })
					.children('li')
					.should('have.length', 1);

				cy.findByRole('button', { name: 'Je souhaite être contacté(e)' }).click();

				cy.findByRole('textbox', { name: 'Prénom' }).type('John', { force: true });
				cy.findByRole('textbox', { name: 'Nom' }).type('Doe', { force: true });
				cy.findByRole('textbox', { name: /Adresse e-mail/ }).type('john.doe@email.com');
				cy.findByRole('textbox', { name: 'Téléphone' }).type('0606060606');
				cy.findByRole('button', { name: 'Age' }).click();
				cy.findByRole('option', { name: '23 ans' }).click();

				interceptGet({
					actionBeforeWaitTheCall: () => cy.findAllByRole('combobox', { name: 'Localisation' }).last().type('par'),
					alias: 'recherche-commune',
					path: '/api/communes?q=*',
					response: JSON.stringify({
						résultats: aCommuneList(),
					}),
				});

				cy.findByRole('listbox', { name: 'Localisation' })
					.within(() => cy.findAllByRole('option').first().click());
				cy.findByRole('textbox', { name: /Commentaires/ }).type('Merci de me recontacter');

				cy.intercept({ method: 'POST', pathname: '/api/etablissements-accompagnement/contact*' }, { statusCode: 201 });
				cy.findByRole('button', { name: 'Envoyer mes informations afin d‘être rappelé(e)' }).click();

				cy.findByRole('heading', { level: 1, name: 'Votre demande a bien été transmise !' })
					.should('exist');
				cy.findByRole('button', { description: 'Fermer, Revenir à la page' }).click();

				cy.findByRole('dialog').should('not.exist');
			});
		});

		describe('quand l‘utilisateur n‘écrit rien et fait une recherche', () => {
			it('affiche un text indiquant qu‘il faut saisir une localisation', () => {
				cy.findByRole('button', { name: 'Rechercher' }).click();
				cy.findByText('Veuillez sélectionner une option dans la liste').should('be.visible');
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
			cy.findByText('Erreur - Demande incorrecte').should('be.visible');
		});
	});
});

/// <reference types="cypress" />

import { aBarmanOffre, aRésultatEchantillonOffre } from '../../src/server/offres/domain/offre.fixture';
import { interceptGet } from '../interceptGet';

describe('Parcours jobs étudiants', () => {
	beforeEach(() => {
		cy.viewport('iphone-x');
		interceptGet({
			actionBeforeWaitTheCall: () => cy.visit('/jobs-etudiants'),
			alias: 'recherche-jobs-etudiants' ,
			path: ' /api/jobs-etudiants*',
			response: JSON.stringify(aRésultatEchantillonOffre()),
		});
	});

	it('affiche 15 résultats par défaut', () => {
		cy.get('ul[aria-label="Offres de jobs étudiants"] > li').should('have.length', 15);
		cy.get('ul[aria-label="Offres de jobs étudiants"] > li').first().should('contain.text', 'Barman / Barmaid (H/F)');
	});

	it('place le focus sur le premier input du formulaire de recherche', () => {
		cy.focused().should('have.attr', 'name', 'motCle');
	});

	context('quand l\'utilisateur rentre un mot clé', () => {
		it('filtre les résultats par mot clé', () => {
			interceptGet({
				actionBeforeWaitTheCall: () => cy.focused().type('barman').type('{enter}'),
				alias: 'recherche-mot-cle-jobs-etudiants' ,
				path: ' /api/jobs-etudiants*',
				response: JSON.stringify({ nombreRésultats: 1, résultats: [aBarmanOffre()] }),
			});

			cy.get('ul[aria-label="Offres de jobs étudiants"] > li').should('have.length', 1);
		});

		context('quand l\'utilisateur veut sélectionner la première offre', () => {
			it('navigue vers le détail de l\'offre', () => {
				const id = aBarmanOffre().id;

				interceptGet({
					actionBeforeWaitTheCall: () => cy.get('ul[aria-label="Offres de jobs étudiants"] > li a').first().click(),
					alias: 'get-jobs-etudiants',
					path: `/_next/data/*/jobs-etudiants/${id}.json?id=${id}`,
					response: JSON.stringify({ pageProps: { jobÉtudiant: aBarmanOffre() } }),
				});
				cy.get('h1').should('contain.text', 'Barman / Barmaid (H/F)');
			});
		});
	});
});

context("quand les paramètres de l'url ne respectent pas le schema de validation du controller", () => {
	it('retourne une erreur de demande incorrecte', () => {
		interceptGet({
			actionBeforeWaitTheCall: () => cy.visit('/jobs-etudiants?page=67'),
			alias: 'recherche-jobs-etudiants-failed',
			path:'/api/jobs-etudiants?page=67',
			response: JSON.stringify({ error: "les paramètres dans l'url ne respectent pas le schema de validation" }),
			statusCode: 400,
		});

		cy.contains('Erreur - Demande incorrecte').should('exist');
	});
});

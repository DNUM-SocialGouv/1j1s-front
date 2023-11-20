/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

import { aBarmanOffre, aRésultatEchantillonOffre } from '../../src/server/offres/domain/offre.fixture';
import { interceptGet } from '../interceptGet';

context('Parcours jobs étudiants', () => {
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
		cy.findByRole('list', { name: /Offres de jobs étudiants/i }).children().should('have.length', 15);
	});

	it('place le focus sur le champ "Métier" du formulaire de recherche', () => {
		cy.findByRole('textbox', { name: /Métier/i }).should('have.focus');
	});

	context('quand l’utilisateur rentre un mot clé', () => {
		it('filtre les résultats par mot clé', () => {
			interceptGet({
				actionBeforeWaitTheCall: () => {
					cy.findByRole('textbox', { name: /Métier/i }).type('barman');
					cy.findByRole('button', { name: /Rechercher/i }).click();
				},
				alias: 'recherche-mot-cle-jobs-etudiants' ,
				path: ' /api/jobs-etudiants*',
				response: JSON.stringify({ nombreRésultats: 1, résultats: [aBarmanOffre()] }),
			});

			cy.findByRole('list', { name: /Offres de jobs étudiants/i }).children().should('have.length', 1);
		});

		context('quand l’utilisateur sélectionne la première offre', () => {
			it('navigue vers le détail de l’offre', () => {
				const id = aBarmanOffre().id;

				interceptGet({
					actionBeforeWaitTheCall: () => (
						cy.findByRole('list', { name: /Offres de jobs étudiants/i })
							.children()
							.first()
							.within(() => cy.findByRole('link', { name: /En savoir plus/i }).click())),
					alias: 'get-jobs-etudiants',
					path: `/_next/data/*/jobs-etudiants/${id}.json?id=${id}`,
					response: JSON.stringify({ pageProps: { jobÉtudiant: aBarmanOffre() } }),
				});
				cy.findByRole('heading', { level: 1 }).should('have.text', 'Barman / Barmaid (H/F)');
			});
		});
	});
});

context('quand les paramètres de l’url ne respectent pas le schema de validation du controller', () => {
	it('retourne une erreur de demande incorrecte', () => {
		interceptGet({
			actionBeforeWaitTheCall: () => cy.visit('/jobs-etudiants?page=67'),
			alias: 'recherche-jobs-etudiants-failed',
			path:'/api/jobs-etudiants?page=67',
			response: JSON.stringify({ error: "les paramètres dans l'url ne respectent pas le schema de validation" }),
			statusCode: 400,
		});

		cy.findByText('Erreur - Demande incorrecte').should('be.visible');
	});
});

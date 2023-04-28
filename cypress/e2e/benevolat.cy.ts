/// <reference types="cypress" />

import { aRésultatRechercheMission } from '~/server/engagement/domain/missionEngagement.fixture';

import { interceptGet } from '../interceptGet';

describe('Parcours bénévolat', () => {
	beforeEach(() => {
		cy.viewport('iphone-x');
		cy.visit('/benevolat');
	});
	context('quand l‘utilisateur choisi un domaine', () => {
		it('affiche la liste des résultats', () => {
			cy.get('button').contains('Sélectionnez votre choix').click();
			cy.get('ul[role="listbox"]:visible').first().click();

			interceptGet(
				{
					actionBeforeWaitTheCall: () => cy.get('input[name="libelleCommune"]').type('paris', { force: true }),
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
			cy.get('ul[role="listbox"]:visible').first().click();

			interceptGet(
				{
					actionBeforeWaitTheCall: () => cy.get('button').contains('Rechercher').click(),
					alias: 'recherche-api-benevolats',
					path: '/api/benevolats*',
					response: JSON.stringify(aRésultatRechercheMission()),
				},
			);

			cy.get('ul[aria-label="Offre pour le bénévolat"] > li a').should('have.length', 2);
		});
	});

	context('quand l‘utilisateur clique sur le premier élément de la liste', () => {
		it('navigue vers le détail de l‘offre', () => {
			const id = aRésultatRechercheMission().résultats[0].id;

			cy.get('button').contains('Sélectionnez votre choix').click();
			cy.get('ul[role="listbox"]:visible').first().click();

			interceptGet(
				{
					actionBeforeWaitTheCall: () => cy.get('button').contains('Rechercher').click(),
					alias: 'recherche-api-benevolats',
					path: '/api/benevolats*',
					response: JSON.stringify(aRésultatRechercheMission()),
				},
			);

			interceptGet(
				{
					actionBeforeWaitTheCall: () => cy.get('ul[aria-label="Offre pour le bénévolat"] > li a').first().click(),
					alias: 'get-benevolat',
					path: `/_next/data/*/benevolat/${id}.json?id=${id}`,
					response: JSON.stringify({ pageProps: { missionEngagement: aRésultatRechercheMission().résultats[0] } }),
				},
			);

			cy.get('h1').should('be.visible');
			cy.get('ul[aria-label="Caractéristiques de la mission"]').should('be.visible');
		});
	});
});

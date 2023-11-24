/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

import { aRésultatRechercheMission } from '~/server/engagement/domain/missionEngagement.fixture';

import { interceptGet } from '../interceptGet';

describe('Parcours bénévolat', () => {

	context('quand l‘utilisateur choisi un domaine', () => {
		beforeEach(() => {
			cy.viewport('iphone-x');
			cy.visit('/benevolat');
		});
		it('affiche la liste des résultats', () => {
			cy.findByRole('button', { name: /Domaine/i }).click();
			cy.findAllByRole('option').first().click();

			interceptGet(
				{
					actionBeforeWaitTheCall: () => cy.findByRole('combobox', { name: /Localisation/i }).type('paris'),
					alias: 'recherche-communes',
					path: '/api/communes*',
					response: JSON.stringify({
						résultats: [
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
						],
					}),
				},
			);
			cy.findAllByRole('option').first().click();

			interceptGet(
				{
					actionBeforeWaitTheCall: () => cy.findByRole('button', { name: /Rechercher/i }).click(),
					alias: 'recherche-api-benevolats',
					path: '/api/benevolats*',
					response: JSON.stringify(aRésultatRechercheMission()),
				},
			);

			cy.findByRole('list', { name: /Offre pour le bénévolat/i }).children().should('have.length', 2);
		});
	});

	context('quand l‘utilisateur clique sur le premier élément de la liste', () => {
		beforeEach(() => {
			cy.viewport('iphone-x');
			cy.visit('/benevolat?domain=culture-loisirs&libelleCommune=Paris+%2875001%29&codeCommune=75056&latitudeCommune=48.859&longitudeCommune=2.347&distanceCommune=10&page=1');
		});
		it('navigue vers le détail de l‘offre', () => {
			const id = aRésultatRechercheMission().résultats[0].id;

			interceptGet(
				{
					actionBeforeWaitTheCall: () => cy.findByRole('button', { name: /Rechercher/i }).click(),
					alias: 'recherche-api-benevolats',
					path: '/api/benevolats*',
					response: JSON.stringify(aRésultatRechercheMission()),
				},
			);

			interceptGet(
				{
					actionBeforeWaitTheCall: () => (
						cy.findByRole('list', { name: /Offre pour le bénévolat/i })
							.children()
							.first()
							.click()
					),
					alias: 'get-benevolat',
					path: `/_next/data/*/benevolat/${id}.json?id=${id}`,
					response: JSON.stringify({ pageProps: { missionEngagement: aRésultatRechercheMission().résultats[0] } }),
				},
			);

			cy.findByRole('heading', { level: 1 }).should('be.visible');
			cy.findByRole('list', { name: /Caractéristiques de la mission/i }).should('be.visible');
		});
	});
});

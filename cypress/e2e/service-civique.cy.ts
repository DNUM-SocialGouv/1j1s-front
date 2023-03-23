/// <reference types="cypress" />

import { aRésultatRechercheMission } from '~/server/engagement/domain/missionEngagement.fixture';

import { interceptGet } from '../interceptGet';

describe('Parcours service civique', () => {
	beforeEach(() => {
		cy.viewport('iphone-x');
		cy.visit('/service-civique');
	});

	context('quand l‘utilisateur choisi un domaine', () => {
		it('affiche la liste des résultats', () => {
			cy.get('button').contains('Sélectionnez votre choix').click();
			cy.get('ul[role="listbox"]').first().click();

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
			cy.get('ul[role="listbox"]').first().click();

			interceptGet({
				actionBeforeWaitTheCall: () => cy.get('button').contains('Rechercher').click(),
				alias: 'recherche-services-civique',
				path: '/api/services-civique*',
				response: JSON.stringify(aRésultatRechercheMission()),
			});

			cy.get('ul[aria-label="Offre pour le service civique"] > li').should('have.length', 2);
			cy.get('ul[aria-label="Offre pour le service civique"] > li').first().should('contain.text', 'Je distribue des produits de première nécessité et des repas aux plus démunis, dans la rue ou au sein d’établissements dédiés');
		});
	});

	context('quand l‘utilisateur clique sur le premier élément de la liste', () => {
		it('navigue vers le détail de l‘offre', () => {
			cy.get('button').contains('Sélectionnez votre choix').click();
			cy.get('ul[role="listbox"]').first().click();

			interceptGet({
				actionBeforeWaitTheCall: () => cy.get('button').contains('Rechercher').click(),
				alias: 'recherche-services-civique',
				path: '/api/services-civique*',
				response: JSON.stringify(aRésultatRechercheMission()),
			});

			const id = aRésultatRechercheMission().résultats[0].id;
			interceptGet({
				actionBeforeWaitTheCall: () => cy.get('ul[aria-label="Offre pour le service civique"] > li a').first().click(),
				alias: 'get-services-civique',
				path: `/_next/data/*/service-civique/${id}.json?id=${id}`,
				response: JSON.stringify({ pageProps: { missionEngagement: aRésultatRechercheMission().résultats[0] } }),
			});

			cy.get('h1').should('contain.text', 'Je distribue des produits de première nécessité et des repas aux plus démunis, dans la rue ou au sein d’établissements dédiés');
			cy.get('ul[aria-label="Caractéristiques de la mission"]').should('be.visible');
		});
	});
});

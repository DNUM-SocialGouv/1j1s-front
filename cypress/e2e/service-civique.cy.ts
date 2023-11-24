/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

import { aRésultatRechercheMission } from '~/server/engagement/domain/missionEngagement.fixture';

import { interceptGet } from '../interceptGet';

context('Parcours service civique', () => {


	context('quand l‘utilisateur choisi un domaine', () => {
		beforeEach(() => {
			cy.viewport('iphone-x');
			cy.visit('/service-civique');
		});
		it('affiche la liste des résultats', () => {
			// FIXME (GAFI 06-11-2023): Devrait être role combobox
			cy.findByRole('button', { name: /Domaine/i }).click();
			cy.findAllByRole('option').first().click();

			interceptGet(
				{
					// FIXME (GAFI 06-11-2023): Devrait être role combobox
					actionBeforeWaitTheCall: () => cy.findByRole('combobox', { name: /Localisation/i }).type('paris'),
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
			cy.findAllByRole('option').first().click();

			interceptGet({
				actionBeforeWaitTheCall: () => cy.findByRole('button', { name: /Rechercher/i }).click(),
				alias: 'recherche-services-civique',
				path: '/api/services-civique*',
				response: JSON.stringify(aRésultatRechercheMission()),
			});

			cy.findByRole('list', { name: /Offre pour le service civique/i }).children().should('have.length', 2);
			cy.findByRole('list', { name: /Offre pour le service civique/i })
				.children()
				.first()
				.should('contain.text', 'Je distribue des produits de première nécessité et des repas aux plus démunis, dans la rue ou au sein d’établissements dédiés');
		});
	});

	context('quand l‘utilisateur clique sur le premier élément de la liste', () => {
		beforeEach(() => {
			cy.viewport('iphone-x');
			cy.visit('/service-civique?domain=culture-loisirs&libelleCommune=Paris+%2875001%29&codeCommune=75056&latitudeCommune=48.859&longitudeCommune=2.347&distanceCommune=10&page=1');
		});
		it('navigue vers le détail de l‘offre', () => {
			interceptGet({
				actionBeforeWaitTheCall: () => cy.findByRole('button', { name: /Rechercher/i }).click(),
				alias: 'recherche-services-civique',
				path: '/api/services-civique*',
				response: JSON.stringify(aRésultatRechercheMission()),
			});

			const id = aRésultatRechercheMission().résultats[0].id;
			interceptGet({
				actionBeforeWaitTheCall: () => (
					cy.findByRole('list', { name: /Offre pour le service civique/i })
						.children()
						.first()
						.within(() => cy.findByRole('link', { name: /En savoir plus/i }).click())
				),
				alias: 'get-services-civique',
				path: `/_next/data/*/service-civique/${id}.json?id=${id}`,
				response: JSON.stringify({ pageProps: { missionEngagement: aRésultatRechercheMission().résultats[0] } }),
			});

			cy.findByRole('heading', { level: 1 })
				.should('contain.text', 'Je distribue des produits de première nécessité et des repas aux plus démunis, dans la rue ou au sein d’établissements dédiés');
			cy.findByRole('list', { name: /Caractéristiques de la mission/i }).should('be.visible');
		});
	});
});

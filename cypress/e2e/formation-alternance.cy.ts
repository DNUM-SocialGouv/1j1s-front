/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

import { Formation } from '~/server/formations/domain/formation';
import { aRésultatRechercheFormationList } from '~/server/formations/domain/formation.fixture';
import {
	aListeDeMetierLaBonneAlternance,
} from '~/server/metiers/domain/métier.fixture';

import { interceptGet } from '../interceptGet';



context('Parcours formation LBA', () => {
	beforeEach(() => {
		cy.viewport('iphone-x');
	});

	it('affiche 0 résultats par défaut', () => {
		cy.visit('/formations/apprentissage');
		cy.findByRole('list', { name: /Formations en alternance/i })
			.should('not.exist');
	});

	it('place le focus sur le premier input du formulaire de recherche', () => {
		cy.visit('/formations/apprentissage');

		cy.findByRole('combobox', { name: /Domaine/i }).should('have.focus');
	});

	context('Quand l’utilisateur cherche un métier', () => {
		it('tous les métiers sont accessibles mais certains sont masqués sans scroll', () => {
			const aListeDeMetierLaBonneAlternanceFixture = aListeDeMetierLaBonneAlternance();
			cy.visit('/formations/apprentissage');
			interceptGet({
				actionBeforeWaitTheCall: () => cy.findByRole('combobox', { name: /Domaine/i }).type('travaux'),
				alias: 'recherche-mot-cle',
				path: '/api/metiers*',
				response: JSON.stringify(aListeDeMetierLaBonneAlternanceFixture),
			});

			cy.findAllByRole('option').first().should('be.visible');
			cy.findAllByRole('option').last().should('not.be.visible');

			cy.findAllByRole('option').last().scrollIntoView();
			cy.findAllByRole('option').last().should('be.visible');
		});
	});

	context('Quand l’utilisateur effectue une recherche', () => {
		it('filtre les résultats par mot clé', () => {
			interceptGet({
				actionBeforeWaitTheCall: () => cy.visit('/formations/apprentissage' + '?libelleMetier=Boulangerie%2C+pâtisserie%2C+chocolaterie&codeRomes=D1102%2CD1104&libelleCommune=Le+Havre+%2876610%29&codeCommune=76351&latitudeCommune=49.507345&longitudeCommune=0.129995&distanceCommune=10'),
				alias: 'recherche-metiers',
				path: '/api/formations*',
				response: JSON.stringify(aRésultatRechercheFormationList()),
			});

			cy.findByRole('list', { name: /Formations en alternance/i }).children().should('have.length', 2);
		});

		describe('Quand l’utilisateur clique sur un résultat', () => {
			describe('Quand la formation résultat est complète', () => {
				it('affiche la page de formation', () => {
					const formationList = aRésultatRechercheFormationList();
					const firstRésultatRechercheFormationId = formationList[0].id;

					const formation: Formation = {
						adresse: {
							adresseComplete: 'adresse',
							codePostal: 'codePostal',
						},
						nomEntreprise: 'nomEntreprise',
						tags: [ 'codePostal' ],
						titre: 'titre',
					};

					const codeCertification = '999';
					const statistiques = {
						millesime: '2020-2021',
						region: 'Pays de la Loire',
						tauxAutres6Mois: '12',
						tauxEnEmploi6Mois: '36',
						tauxEnFormation: '22',
					};

					interceptGet({
						actionBeforeWaitTheCall: () => cy.visit('/formations/apprentissage' + '?libelleMetier=Boulangerie%2C+pâtisserie%2C+chocolaterie&codeRomes=D1102%2CD1104&libelleCommune=Le+Havre+%2876610%29&codeCommune=76351&latitudeCommune=49.507345&longitudeCommune=0.129995&distanceCommune=10'),
						alias: 'recherche-metiers',
						path: '/api/formations*',
						response: JSON.stringify(aRésultatRechercheFormationList()),
					});

					interceptGet({
						actionBeforeWaitTheCall: () => cy.findByRole('list', { name: /Formations en alternance/i }).children().first().click(),
						alias: 'résultat-formation',
						path: `/_next/data/*/formations/apprentissage/${firstRésultatRechercheFormationId}.json?codeRomes=D1102%2CD1104&codeCommune=76351&latitudeCommune=49.507345&longitudeCommune=0.129995&distanceCommune=10&codeCertification=${codeCertification}&id=${firstRésultatRechercheFormationId}`,
						response: JSON.stringify({ pageProps: { formation, statistiques } }),
					});
					cy.findByRole('heading', { level: 1 }).contains(formation.titre);
					cy.findByRole('heading', { level: 2, name: formation.nomEntreprise }).should('be.visible');
				});
			});
		});
	});
});

context("quand les paramètres de l'url ne respectent pas le schema de validation du controller", () => {
	it('retourne une erreur de demande incorrecte', () => {
		cy.viewport('iphone-x');

		interceptGet({
			actionBeforeWaitTheCall: () => cy.visit('/formations/apprentissage?libelleMetier=Electronique%2C+informatique+industrielle&codeRomes=H1206%2CH1402%2CH2502%2CI1102%2CH1208%2CH1502%2CH1209%2CH1504%2CI1305%2CI1304%2CI1302%2CH2501%2CH2603%2CH2604%2CH2605&libelleCommune=Paris+20e+Arrondissement+%2875020%29&codeCommune=&latitudeCommune=48.863367&longitudeCommune=2.397152&distanceCommune=10&unwanted-query=not-allowed'),
			alias: 'recherche-formations-failed',
			path:'/api/formations?*',
			response: JSON.stringify({ error: "les paramètres dans l'url ne respectent pas le schema de validation" }),
			statusCode: 400,
		});
		cy.findByText('Erreur - Demande incorrecte').should('be.visible');
	});
});

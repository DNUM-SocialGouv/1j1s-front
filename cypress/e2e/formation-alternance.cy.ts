/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

import { aFormation, aRésultatRechercheFormationList } from '~/server/formations/domain/formation.fixture';
import { aListeDeMetierLaBonneAlternance } from '~/server/metiers/domain/metierAlternance.fixture';


context('Parcours formation LBA', () => {
	beforeEach(() => {
		cy.viewport('iphone-x');
	});

	it('affiche 0 résultats par défaut', () => {
		cy.visit('/formations/apprentissage');
		cy.findByRole('list', { name: /Formations en alternance/i })
			.should('not.exist');
	});

	context('Quand l’utilisateur cherche un métier', () => {
		it('tous les métiers sont accessibles mais certains sont masqués sans scroll', () => {
			const aListeDeMetierLaBonneAlternanceFixture = aListeDeMetierLaBonneAlternance();
			cy.visit('/formations/apprentissage');

			cy.intercept(
				'GET',
				'/api/metiers*',
				JSON.stringify(aListeDeMetierLaBonneAlternanceFixture),
			).as('recherche-mot-cle');

			cy.findByRole('combobox', { name: /Domaine/i }).type('travaux');
			cy.wait('@recherche-mot-cle');

			cy.findAllByRole('option').first().should('be.visible');
			cy.findAllByRole('option').last().should('not.be.visible');

			cy.findAllByRole('option').last().scrollIntoView();
			cy.findAllByRole('option').last().should('be.visible');
		});
	});

	context('Quand l’utilisateur effectue une recherche', () => {
		it('filtre les résultats par mot clé', () => {
			cy.intercept(
				'GET',
				'/api/formations*',
				JSON.stringify(aRésultatRechercheFormationList()),
			).as('recherche-metiers');

			cy.visit('/formations/apprentissage' + '?libelleMetier=Boulangerie%2C+pâtisserie%2C+chocolaterie&codeRomes=D1102%2CD1104&libelleCommune=Le+Havre+%2876610%29&codeCommune=76351&latitudeCommune=49.507345&longitudeCommune=0.129995&distanceCommune=10');
			cy.wait('@recherche-metiers');

			cy.findByRole('list', { name: /Formations en alternance/i }).children().should('have.length', 2);
		});

		describe('Quand l’utilisateur clique sur un résultat', () => {
			describe('Quand la formation résultat est complète', () => {
				it('affiche la page de formation', () => {
					const formationList = aRésultatRechercheFormationList();
					const firstRésultatRechercheFormationId = formationList[0].id;

					const formation = aFormation({
						adresse: {
							adresseComplete: 'adresse',
							codePostal: 'codePostal',
						},
						nomEntreprise: 'nomEntreprise',
						tags: ['codePostal'],
						titre: 'titre',
					});

					const codeCertification = '999';
					const statistiques = {
						millesime: '2020-2021',
						region: 'Pays de la Loire',
						tauxAutres6Mois: '12',
						tauxEnEmploi6Mois: '36',
						tauxEnFormation: '22',
					};

					cy.intercept(
						'GET',
						'/api/formations*',
						JSON.stringify(aRésultatRechercheFormationList()),
					).as('recherche-metiers');

					cy.visit('/formations/apprentissage' + '?libelleMetier=Boulangerie%2C+pâtisserie%2C+chocolaterie&codeRomes=D1102%2CD1104&libelleCommune=Le+Havre+%2876610%29&codeCommune=76351&latitudeCommune=49.507345&longitudeCommune=0.129995&distanceCommune=10');
					cy.wait('@recherche-metiers');

					cy.intercept(
						'GET',
						`/_next/data/*/formations/apprentissage/${firstRésultatRechercheFormationId}.json?codeRomes=D1102%2CD1104&codeCommune=76351&latitudeCommune=49.507345&longitudeCommune=0.129995&distanceCommune=10&codeCertification=${codeCertification}&id=${firstRésultatRechercheFormationId}`,
						JSON.stringify({ pageProps: { formation, statistiques } }),
					).as('résultat-formation');

					cy.findByRole('list', { name: /Formations en alternance/i }).children().first().click();
					cy.wait('@résultat-formation');

					cy.findByRole('heading', { level: 1 }).contains('titre');
					cy.findByRole('heading', { level: 2, name: formation.nomEntreprise }).should('be.visible');
				});
			});
		});
	});
});

context("quand les paramètres de l'url ne respectent pas le schema de validation du controller", () => {
	it('retourne une erreur de demande incorrecte', () => {
		cy.viewport('iphone-x');

		cy.intercept(
			'GET',
			'/api/formations*',
			{
				body: JSON.stringify({ error: "les paramètres dans l'url ne respectent pas le schema de validation" }),
				statusCode: 400,
			},
		).as('recherche-formations-failed');

		cy.visit('/formations/apprentissage?libelleMetier=Electronique%2C+informatique+industrielle&codeRomes=H1206%2CH1402%2CH2502%2CI1102%2CH1208%2CH1502%2CH1209%2CH1504%2CI1305%2CI1304%2CI1302%2CH2501%2CH2603%2CH2604%2CH2605&libelleCommune=Paris+20e+Arrondissement+%2875020%29&codeCommune=&latitudeCommune=48.863367&longitudeCommune=2.397152&distanceCommune=10&unwanted-query=not-allowed');
		cy.wait('@recherche-formations-failed');
		cy.findByText('Erreur - Demande incorrecte').should('be.visible');
	});
});

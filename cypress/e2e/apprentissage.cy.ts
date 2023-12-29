/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

import { stringify } from 'querystring';

import {
	anAlternanceMatcha,
	anAlternanceMatchaBoulanger,
	anAlternancePEJobs,
} from '~/server/alternances/domain/alternance.fixture';

import { aMetier } from '../../src/server/metiers/domain/metierAlternance.fixture';
import { interceptGet } from '../interceptGet';

const aQuery = {
	codeCommune: '13043',
	codeRomes: 'D1102, D1104',
	distanceCommune: 10,
	latitudeCommune: 48.859,
	libelleCommune: 'Gignac-la-Nerthe (13180)',
	libelleMetier: 'Boulangerie, pâtisserie, chocolaterie',
	longitudeCommune: 2.347,
};

describe('Parcours alternance LBA', () => {
	beforeEach(() => {
		cy.viewport('iphone-x');
	});

	it('ne fait pas de recherche par défaut', () => {
		cy.visit('/apprentissage');
		cy.findByRole('list', { name: /Offres d’alternances/i }).should('not.exist');
	});

	it('place le focus sur le premier input du formulaire de recherche', () => {
		cy.visit('/apprentissage');
		cy.findByRole('combobox', { name: 'Domaine' }).should('have.focus');
	});

	describe('Quand l’utilisateur cherche un métier', () => {
		it('tous les métiers sont accessibles mais au maximum 10 sont visibles sans scroll', () => {
			const listeMetiers = new Array(11).fill(aMetier());

			cy.visit('/apprentissage');
			interceptGet({
				actionBeforeWaitTheCall: () => cy.findByRole('combobox', { name: /Domaine/i }).type('travaux'),
				alias: 'recherche-mot-cle-alternances',
				path: '/api/metiers*',
				response: JSON.stringify(listeMetiers),
			});

			cy.findAllByRole('option').should('have.length', 11);
			cy.findAllByRole('option').first().should('be.visible');
			cy.findAllByRole('option').last().should('not.be.visible');
		});
	});

	describe('Quand l’utilisateur effectue une recherche', () => {
		it('affiche les résultats', () => {
			const alternances = {
				entrepriseList: [],
				offreList: [anAlternanceMatcha(), anAlternanceMatchaBoulanger(), anAlternancePEJobs()],
			};
			interceptGet({
				actionBeforeWaitTheCall: () => cy.visit(`/apprentissage?${stringify(aQuery)}`),
				alias: 'recherche-metiers',
				path: '/api/alternances?*',
				response: JSON.stringify(alternances),
			});

			cy.findByRole('list', { name: /Offres d’alternances/i })
				.children()
				.should('have.length', 3);
		});
	});
});

describe("quand les paramètres de l'url ne respectent pas le schema de validation du controller", () => {
	it('retourne une erreur de demande incorrecte', () => {
		cy.viewport('iphone-x');
		const query = {
			...aQuery,
			'unwanted-query': 'not-allowed',
		};

		interceptGet({
			actionBeforeWaitTheCall: () => cy.visit(`/apprentissage?${stringify(query)}`),
			alias: 'recherche-alternances-failed',
			path:'/api/alternances?*',
			response: JSON.stringify({ error: "les paramètres dans l'url ne respectent pas le schema de validation" }),
			statusCode: 400,
		});
		cy.findByText(/Erreur - Demande incorrecte/i).should('be.visible');
	});
});

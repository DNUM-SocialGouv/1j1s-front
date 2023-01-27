/// <reference types="cypress" />

import annonceDeLogementResponse from '../fixture/annonces/annonceDeLogementResponse.fixture.json';

describe('Détails annonce de logement', () => {
	const slug = 't1-17-a-26-m-a-partir-de-391-par-mois-1091498';
	context('en Mobile', () => {
		describe('quand on scroll en mobile', () => {
			const iPhoneXHeight = 812;
			it('le bouton de voir l‘annonce est visible', () => {
				cy.viewport('iphone-x');
				cy.intercept({ pathname: `/slugify/slugs/annonce-de-logement/${slug}?populate=deep` }, annonceDeLogementResponse);
				cy.visit(`/annonces/${slug}`);
				cy.contains('a', 'Voir l‘annonce');
				/* eslint-disable cypress/no-unnecessary-waiting */
				cy.wait(1000); // let time for the scroll to happen
				cy.scrollTo(0, iPhoneXHeight);
				cy.contains('a', 'Voir l‘annonce');
			});
		});
	});

	context('en Desktop', () => {
		describe('quand on scroll en desktop', () => {
			const macBook15Height = 900;
			it('le bouton de voir l‘annonce est visible',  () => {
				cy.viewport('macbook-15');
				cy.intercept({ pathname: `/slugify/slugs/annonce-de-logement/${slug}?populate=deep` }, annonceDeLogementResponse);
				cy.visit(`/annonces/${slug}`);
				cy.contains('a', 'Voir l‘annonce');
				/* eslint-disable cypress/no-unnecessary-waiting */
				cy.wait(1000); // let time for the scroll to happen
				cy.scrollTo(0, macBook15Height);
				cy.contains('a', 'Voir l‘annonce');
			});
		});
	});
});

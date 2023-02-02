/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import React from 'react';

import {
	ÉtiquettesFiltreOffreEmploi,
} from '~/client/components/features/OffreEmploi/Rechercher/ÉtiquettesFiltreOffreEmploi';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';

describe('Étiquettes filtre emploi', () => {

	beforeEach(() => {
		mockSmallScreen();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('quand une recherche est lancée', () => {
		it('retourne une liste d‘étiquettes',  async () => {

			mockUseRouter({
				query: {
					codeLocalisation: '26',
					libelleLocalisation: 'BOURG LES VALENCE (26)',
					typeLocalisation: 'DEPARTEMENT',
				},
			});
			render(<ÉtiquettesFiltreOffreEmploi/>);

			const filtresRecherche = await screen.findByRole('list', { name: 'Filtres de la recherche' });
			expect(filtresRecherche).toBeInTheDocument();
		});
	});

	describe('quand une recherche est lancée avec le filtre temps de travail', () => {
		it('retourne une liste d‘étiquettes contenant le libellé',  async () => {

			mockUseRouter({
				query: {
					tempsDeTravail: 'tempsPlein',
				},
			});
			render(<ÉtiquettesFiltreOffreEmploi/>);

			const filtresRecherche = await screen.findByRole('list', { name: 'Filtres de la recherche' });
			const tempsDeTravail = within(filtresRecherche).getByText('Temps plein');
			expect(filtresRecherche).toBeInTheDocument();
			expect(tempsDeTravail).toBeInTheDocument();
		});
	});

	describe('quand une recherche est lancée avec le filtre type de contrats', () => {
		it('retourne une liste d‘étiquettes contenant les types de contrats',  async () => {

			mockUseRouter({
				query: {
					typeDeContrats: 'CDD,CDI,MIS',
				},
			});
			render(<ÉtiquettesFiltreOffreEmploi/>);

			const filtresRecherche = await screen.findByRole('list', { name: 'Filtres de la recherche' });
			const cdi = within(filtresRecherche).getByText('CDI');
			const cdd = within(filtresRecherche).getByText('CDD');
			const intérim = within(filtresRecherche).getByText('Intérim');
			expect(filtresRecherche).toBeInTheDocument();
			expect(cdi).toBeInTheDocument();
			expect(cdd).toBeInTheDocument();
			expect(intérim).toBeInTheDocument();
		});
	});

	describe('quand une recherche est lancée avec le filtre expérience exigée', () => {
		it('retourne une liste d‘étiquettes contenant l‘expérience exigée',  async () => {

			mockUseRouter({
				query: {
					experienceExigence: 'S,D,E',
				},
			});
			render(<ÉtiquettesFiltreOffreEmploi/>);

			const filtresRecherche = await screen.findByRole('list', { name: 'Filtres de la recherche' });
			const débutant = within(filtresRecherche).getByText('Moins de 1 an');
			const confirmé = within(filtresRecherche).getByText('De 1 à 3 ans');
			const senior = within(filtresRecherche).getByText('Plus de 3 ans');
			expect(filtresRecherche).toBeInTheDocument();
			expect(débutant).toBeInTheDocument();
			expect(confirmé).toBeInTheDocument();
			expect(senior).toBeInTheDocument();
		});
	});
	describe('quand une recherche est lancée avec le filtre localisation', () => {
		it('retourne une liste d‘étiquettes contenant l‘expérience exigée',  async () => {

			mockUseRouter({
				query: {
					codeLocalisation: '26',
					libelleLocalisation: 'Bourg-lès-Valence (26500)',
					typeLocalisation: 'DEPARTEMENT',
				},
			});
			render(<ÉtiquettesFiltreOffreEmploi/>);

			const filtresRecherche = await screen.findByRole('list', { name: 'Filtres de la recherche' });
			const localisation = within(filtresRecherche).getByText('Bourg-lès-Valence (26500)');
			expect(filtresRecherche).toBeInTheDocument();
			expect(localisation).toBeInTheDocument();
		});
	});
});

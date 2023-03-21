/**
 * @jest-environment jsdom
 */

import {
	render,
	screen,
	within,
} from '@testing-library/react';
import React from 'react';

import { ÉtiquettesFiltreFormation } from '~/client/components/features/Formation/Rechercher/ÉtiquettesFiltreFormation';
import { mockUseRouter } from '~/client/components/useRouter.mock';

describe('ÉtiquettesFiltreFormation', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('quand une recherche est lancée', () => {
		it('retourne une liste d‘étiquettes',  async () => {
			mockUseRouter({
				query: {
					codeCommune: '75120',
					codeRomes: 'I1401,I1402',
					distanceCommune:' 10',
					latitudeCommune: '48.863367',
					libelleCommune:'Paris 20e Arrondissement (75020)',
					libelleMetier: 'Maintenance, installation et assistance informatique',
					longitudeCommune: '2.397152',
				},
			});
			render(<ÉtiquettesFiltreFormation/>);

			const filtresRecherche = await screen.findByRole('list', { name: 'Filtres de la recherche' });
			expect(filtresRecherche).toBeInTheDocument();
		});
	});

	describe('quand une recherche est lancée avec le filtre de localisation', () => {
		it('retourne une liste d‘étiquettes contenant la localisation',  async () => {

			mockUseRouter({
				query: {
					codeCommune: '75120',
					codeRomes: 'I1401,I1402',
					distanceCommune:' 10',
					latitudeCommune: '48.863367',
					libelleCommune:'Paris 20e Arrondissement (75020)',
					libelleMetier: 'Maintenance, installation et assistance informatique',
					longitudeCommune: '2.397152',
				},
			});
			render(<ÉtiquettesFiltreFormation/>);

			const filtresRecherche = await screen.findByRole('list', { name: 'Filtres de la recherche' });
			expect(filtresRecherche).toBeInTheDocument();
			const localisation = within(filtresRecherche).getByText('Paris 20e Arrondissement (75020)');
			expect(filtresRecherche).toBeInTheDocument();
			expect(localisation).toBeInTheDocument();
		});
	});

	describe('quand une recherche est lancée avec le filtre de niveau d’études', () => {
		describe('et que ce dernier est renseignée', () => {
			it('retourne une liste d‘étiquettes contenant la localisation et le niveau d’étude',  async () => {

				mockUseRouter({
					query: {
						codeCommune: '75120',
						codeRomes: 'I1401,I1402',
						distanceCommune:' 10',
						latitudeCommune: '48.863367',
						libelleCommune:'Paris 20e Arrondissement (75020)',
						libelleMetier: 'Maintenance, installation et assistance informatique',
						longitudeCommune: '2.397152',
						niveauEtudes: '6',
					},
				});
				render(<ÉtiquettesFiltreFormation/>);

				const filtresRecherche = await screen.findByRole('list', { name: 'Filtres de la recherche' });
				expect(filtresRecherche).toBeInTheDocument();
				const localisation = within(filtresRecherche).getByText('Paris 20e Arrondissement (75020)');
				expect(filtresRecherche).toBeInTheDocument();
				expect(localisation).toBeInTheDocument();

				const niveauEtudes = within(filtresRecherche).getByText('Licence, BUT, autres formations niveau 6 (Bac + 3)');
				expect(niveauEtudes).toBeInTheDocument();
			});
		});

		describe('et que ce dernier n’est pas renseignée', () => {
			it('retourne une liste d‘étiquettes contenant la localisation',  async () => {

				mockUseRouter({
					query: {
						codeCommune: '75120',
						codeRomes: 'I1401,I1402',
						distanceCommune:' 10',
						latitudeCommune: '48.863367',
						libelleCommune:'Paris 20e Arrondissement (75020)',
						libelleMetier: 'Maintenance, installation et assistance informatique',
						longitudeCommune: '2.397152',
						niveauEtudes: 'indifférent',
					},
				});
				render(<ÉtiquettesFiltreFormation/>);

				const filtresRecherche = await screen.findByRole('list', { name: 'Filtres de la recherche' });
				expect(filtresRecherche).toBeInTheDocument();
				const localisation = within(filtresRecherche).getByText('Paris 20e Arrondissement (75020)');
				expect(filtresRecherche).toBeInTheDocument();
				expect(localisation).toBeInTheDocument();

				const niveauEtudes = within(filtresRecherche).queryByText('indifférent');
				expect(niveauEtudes).not.toBeInTheDocument();
			});
		});
	});
});

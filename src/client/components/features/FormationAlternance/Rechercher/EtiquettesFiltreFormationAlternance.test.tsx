/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import React from 'react';

import { EtiquettesFiltreFormationAlternance } from '~/client/components/features/FormationAlternance/Rechercher/EtiquettesFiltreFormationAlternance';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { aCommuneQuery } from '~/client/hooks/useCommuneQuery';

describe('EtiquettesFiltreFormation', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('quand une recherche est lancée avec les inputs obligatoires', () => {
		it('retourne une liste d‘étiquettes', async () => {
			mockUseRouter({
				query: {
					codeCommune: '75120',
					codePostal: '75020',
					codeRomes: 'I1401,I1402',
					distanceCommune: '10',
					latitudeCommune: '48.863367',
					libelleMetier: 'Maintenance, installation et assistance informatique',
					longitudeCommune: '2.397152',
					ville: 'Paris 20e Arrondissement',
				},
			});
			render(<EtiquettesFiltreFormationAlternance/>);

			const filtresRecherche = await screen.findByRole('list', { name: 'Filtres de la recherche' });
			expect(filtresRecherche).toBeVisible();
		});
	});

	describe('quand une recherche est lancée avec le filtre de localisation', () => {
		it('retourne une liste d‘étiquettes contenant la localisation', async () => {
			mockUseRouter({
				query: {
					codeCommune: '75120',
					codePostal: '75020',
					codeRomes: 'I1401,I1402',
					distanceCommune: '10',
					latitudeCommune: '48.863367',
					libelleMetier: 'Maintenance, installation et assistance informatique',
					longitudeCommune: '2.397152',
					ville: 'Paris 20e Arrondissement',
				},
			});
			render(<EtiquettesFiltreFormationAlternance/>);

			const filtresRecherche = await screen.findByRole('list', { name: 'Filtres de la recherche' });

			const localisation = within(filtresRecherche).getByText('Paris 20e Arrondissement (75020)');
			expect(localisation).toBeVisible();
		});
	});

	describe('quand une recherche est lancée avec le filtre de niveau d’études', () => {
		describe('et que ce dernier est renseignée', () => {
			it('retourne une liste d‘étiquettes contenant la localisation et le niveau d’étude', async () => {

				mockUseRouter({
					query: {
						codeCommune: '75120',
						codePostal: '75020',
						codeRomes: 'I1401,I1402',
						distanceCommune: '10',
						latitudeCommune: '48.863367',
						libelleMetier: 'Maintenance, installation et assistance informatique',
						longitudeCommune: '2.397152',
						niveauEtudes: '6',
						ville: 'Paris 20e Arrondissement',
					},
				});
				render(<EtiquettesFiltreFormationAlternance/>);

				const filtresRecherche = await screen.findByRole('list', { name: 'Filtres de la recherche' });

				const localisation = within(filtresRecherche).getByText('Paris 20e Arrondissement (75020)');
				expect(localisation).toBeVisible();

				const niveauEtudes = within(filtresRecherche).getByText('Licence, BUT, autres formations niveau 6 (Bac + 3)');
				expect(niveauEtudes).toBeVisible();
			});
		});

		describe('et que ce dernier n’est pas renseignée', () => {
			it('retourne une liste d‘étiquettes contenant la localisation', async () => {

				mockUseRouter({
					query: {
						codeCommune: '75120',
						codePostal: '75020',
						codeRomes: 'I1401,I1402',
						distanceCommune: '10',
						latitudeCommune: '48.863367',
						libelleMetier: 'Maintenance, installation et assistance informatique',
						longitudeCommune: '2.397152',
						niveauEtudes: 'indifférent',
						ville: 'Paris 20e Arrondissement',
					},
				});
				
				render(<EtiquettesFiltreFormationAlternance/>);

				const filtresRecherche = await screen.findByRole('list', { name: 'Filtres de la recherche' });

				const localisation = within(filtresRecherche).getByText('Paris 20e Arrondissement (75020)');
				expect(localisation).toBeVisible();

				const niveauEtudes = within(filtresRecherche).queryByText('indifférent');
				expect(niveauEtudes).not.toBeInTheDocument();
			});
		});
	});
});

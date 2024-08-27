/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import React from 'react';

import { EtiquettesFiltreMission } from '~/client/components/features/Engagement/Rechercher/ResultatsRecherche/EtiquettesFiltreMission';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';

describe('Etiquettes filtre mission', () => {

	beforeEach(() => {
		mockSmallScreen();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('quand une recherche est lancée', () => {
		it('retourne une liste d‘étiquettes', async () => {

			mockUseRouter({
				query: {
					ouvertsAuxMineurs: 'true',
					page: '1',
				},
			});
			render(<EtiquettesFiltreMission />);

			const filtresRecherche = await screen.findByRole('list', { name: 'Filtres de la recherche' });
			expect(filtresRecherche).toBeVisible();
		});
	});

	describe('quand une recherche est lancée avec le filtre domaine', () => {
		it('retourne une liste d‘étiquettes contenant le libellé',  async () => {

			mockUseRouter({
				query: {
					codeCommune: '75',
					codePostal: '75001',
					ville: 'Paris',
				},
			});
			render(<EtiquettesFiltreMission />);

			const filtresRecherche = await screen.findByRole('list', { name: 'Filtres de la recherche' });
			const localisation = within(filtresRecherche).getByText('Paris (75001)');
			expect(localisation).toBeVisible();
		});
	});

	describe('quand une recherche est lancée avec le filtre ouverts aux mineurs', () => {
		it('retourne une liste d‘étiquettes contenant un tag ouverts aux mineurs',  async () => {

			mockUseRouter({
				query: {
					codeCommune: '75',
					codePostal: '75001',
					ouvertsAuxMineurs: 'true',
					ville: 'Paris',
				},
			});
			render(<EtiquettesFiltreMission />);

			const filtresRecherche = await screen.findByRole('list', { name: 'Filtres de la recherche' });
			const ouvertsAuxMineurs = within(filtresRecherche).getByText('Dès 16 ans');
			expect(ouvertsAuxMineurs).toBeVisible();
		});
	});
});

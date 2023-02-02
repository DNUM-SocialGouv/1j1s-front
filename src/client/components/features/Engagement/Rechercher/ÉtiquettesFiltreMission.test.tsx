/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import React from 'react';

import { ÉtiquettesFiltreMission } from '~/client/components/features/Engagement/Rechercher/ÉtiquettesFiltreMission';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';

describe('Étiquettes filtre mission', () => {

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
			render(<ÉtiquettesFiltreMission/>);

			const filtresRecherche = await screen.findByRole('list', { name: 'Filtres de la recherche' });
			expect(filtresRecherche).toBeInTheDocument();
		});
	});

	describe('quand une recherche est lancée avec le filtre domaine', () => {
		it('retourne une liste d‘étiquettes contenant le libellé',  async () => {

			mockUseRouter({
				query: {
					codeCommune: '75',
					libelleCommune: 'Paris',
				},
			});
			render(<ÉtiquettesFiltreMission/>);

			const filtresRecherche = await screen.findByRole('list', { name: 'Filtres de la recherche' });
			const localisation = within(filtresRecherche).getByText('Paris');
			expect(filtresRecherche).toBeInTheDocument();
			expect(localisation).toBeInTheDocument();
		});
	});

	describe('quand une recherche est lancée avec le filtre ouverts aux mineurs', () => {
		it('retourne une liste d‘étiquettes contenant un tag ouverts aux mineurs',  async () => {

			mockUseRouter({
				query: {
					codeCommune: '75',
					libelleCommune: 'Paris',
					ouvertsAuxMineurs: 'true',
				},
			});
			render(<ÉtiquettesFiltreMission/>);

			const filtresRecherche = await screen.findByRole('list', { name: 'Filtres de la recherche' });
			const ouvertsAuxMineurs = within(filtresRecherche).getByText('Dès 16 ans');
			expect(filtresRecherche).toBeInTheDocument();
			expect(ouvertsAuxMineurs).toBeInTheDocument();
		});
	});
});

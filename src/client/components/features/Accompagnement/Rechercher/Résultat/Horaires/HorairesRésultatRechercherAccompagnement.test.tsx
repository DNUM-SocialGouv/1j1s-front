/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import {
	HorairesRésultatRechercherAccompagnement,
} from '~/client/components/features/Accompagnement/Rechercher/Résultat/Horaires/HorairesRésultatRechercherAccompagnement';
import { ÉtablissementAccompagnement } from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';

describe('HorairesRésultatRechercherAccompagnement', () => {
	describe('quand heures est undefined ou un tableau vide', () => {
		it('affiche "Fermé"', () => {
			const horaire: ÉtablissementAccompagnement.Horaire = {
				heures: [],
				jour: 'Lundi',
			};
      
			render(
				<output name="result">
					<HorairesRésultatRechercherAccompagnement horaire={horaire} />
				</output>,
			);

			const status = screen.getByRole('status');

			expect(status).toHaveTextContent('Lundi : Fermé');
		});
	});

	describe('quand heures contient qu‘une seule plage horaire', () => {
		it('affiche la plage d‘ouverture', () => {
			const horaire: ÉtablissementAccompagnement.Horaire = {
				heures: [
					{
						début: '14:00:00',
						fin: '19:00:00',
					},
				],
				jour: 'Mardi',
			};

			render(
				<output name="result">
					<HorairesRésultatRechercherAccompagnement horaire={horaire} />
				</output>,
			);

			const status = screen.getByRole('status');

			expect(status).toHaveTextContent('Mardi : 14h - 19h');
		});
	});

	describe('quand heures contient plusieurs plages horaires', () => {
		it('affiche les différentes plages d‘ouverture', () => {
			const horaire: ÉtablissementAccompagnement.Horaire = {
				heures: [
					{
						début: '10:30:00',
						fin: '13:00:00',
					},
					{
						début: '14:00:00',
						fin: '19:00:00',
					},
				],
				jour: 'Vendredi',
			};

			render(
				<output name="result">
					<HorairesRésultatRechercherAccompagnement horaire={horaire} />
				</output>,
			);

			const status = screen.getByRole('status');

			expect(status).toHaveTextContent('Vendredi : 10h30 - 13h et 14h - 19h');
		});
	});
});

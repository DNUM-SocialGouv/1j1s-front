/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import {
	RésultatRechercherAccompagnementMobile,
} from '~/client/components/features/Accompagnement/Rechercher/Résultat/RésultatRechercherAccompagnementMobile';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { TypeÉtablissement } from '~/server/établissement-accompagnement/domain/etablissementAccompagnement';

describe('RésultatRechercherAccompagnement', () => {
	describe('Quand le type d‘accompagnement est une mission locale', () => {
		it('n‘affiche pas l‘email', () => {
			// GIVEN
			const email = 'email';
			const établissement = {
				adresse: 'address',
				email: email,
				horaires: [],
				id: 'id',
				nom: 'nom',
				telephone: 'telephone',
				type: TypeÉtablissement.MISSION_LOCALE,
			};

			// WHEN
			render(<DependenciesProvider>
				<RésultatRechercherAccompagnementMobile établissement={établissement} onContactClick={() => ({})}/>
			</DependenciesProvider>);

			// THEN
			expect(screen.queryByText(email)).not.toBeInTheDocument();
		});

		it('affiche le bouton "Je souhaite être contacté(e)"', () => {
			// GIVEN
			const établissement = {
				adresse: 'address',
				email: 'email',
				horaires: [],
				id: 'id',
				nom: 'nom',
				telephone: 'telephone',
				type: TypeÉtablissement.MISSION_LOCALE,
			};

			// WHEN
			render(<DependenciesProvider>
				<RésultatRechercherAccompagnementMobile établissement={établissement} onContactClick={() => ({})}/>
			</DependenciesProvider>);

			// THEN
			const button = screen.getByRole('button', { name: 'Je souhaite être contacté(e)' });
			expect(button).toBeVisible();
		});
	});

	describe('Quand le type d‘accompagnement n‘est pas une mission locale', () => {
		it('affiche l‘email', () => {
			// GIVEN
			const email = 'email';
			const établissement = {
				adresse: 'address',
				email: email,
				horaires: [],
				id: 'id',
				nom: 'nom',
				telephone: 'telephone',
				type: TypeÉtablissement.INFO_JEUNE,
			};

			// WHEN
			render(<DependenciesProvider>
				<RésultatRechercherAccompagnementMobile établissement={établissement} onContactClick={() => ({})}/>
			</DependenciesProvider>);

			// THEN
			const link = screen.getByRole('link', { name: 'Contacter l‘agence' });
			expect(link).toBeVisible();
			expect(link).toHaveAttribute('href', `mailto:${email}`);
			expect(link).toHaveAttribute('title', 'Contacter l‘agence - adresse mail');
		});

		it('n‘affiche pas le bouton "Je souhaite être contacté(e)"', () => {
			// GIVEN
			const établissement = {
				adresse: 'address',
				email: 'email',
				horaires: [],
				id: 'id',
				nom: 'nom',
				telephone: 'telephone',
				type: TypeÉtablissement.INFO_JEUNE,
			};

			// WHEN
			render(<DependenciesProvider>
				<RésultatRechercherAccompagnementMobile établissement={établissement} onContactClick={() => ({})}/>
			</DependenciesProvider>);

			// THEN
			expect(screen.queryByRole('button', { name: 'Je souhaite être contacté(e)' })).not.toBeInTheDocument();
		});
	});

	describe('Quand aucune horaire n’est disponible', () => {
		it('n‘affiche pas "Voir les horaires d’ouverture"', () => {
			// GIVEN
			const établissement = {
				adresse: 'address',
				email: 'email',
				horaires: [],
				id: 'id',
				nom: 'nom',
				telephone: 'telephone',
				type: TypeÉtablissement.INFO_JEUNE,
			};

			// WHEN
			render(<DependenciesProvider>
				<RésultatRechercherAccompagnementMobile établissement={établissement} onContactClick={() => ({})}/>
			</DependenciesProvider>);

			// THEN
			expect(screen.queryByText('Voir les horaires d‘ouverture')).not.toBeInTheDocument();
		});
	});
	
	describe('Quand des horaires sont disponibles', () => {
		it('affiche "Voir les horaires d’ouverture" et les horaires', async () => {
			// GIVEN
			const établissement = {
				adresse: 'address',
				email: 'email',
				horaires: [
					{
						heures: [
							{
								début: '09:00',
								fin: '12:00',
							},
						],
						jour: 'Lundi',
					},
				],
				id: 'id',
				nom: 'nom',
				telephone: 'telephone',
				type: TypeÉtablissement.INFO_JEUNE,
			};

			// WHEN
			render(<DependenciesProvider>
				<RésultatRechercherAccompagnementMobile établissement={établissement} onContactClick={() => ({})}/>
			</DependenciesProvider>);

			await userEvent.click(screen.getByText('Voir les horaires d‘ouverture'));

			// THEN
			expect(screen.getByText('Voir les horaires d‘ouverture')).toBeVisible();
			expect(screen.getByText('Lundi')).toBeVisible();
			expect(screen.getByText('09h')).toBeVisible();
			expect(screen.getByText('12h')).toBeVisible();
		});
	});
});

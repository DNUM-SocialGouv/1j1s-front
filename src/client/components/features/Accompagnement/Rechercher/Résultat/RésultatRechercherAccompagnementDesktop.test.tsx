/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import {
	RésultatRechercherAccompagnementDesktop,
} from '~/client/components/features/Accompagnement/Rechercher/Résultat/RésultatRechercherAccompagnementDesktop';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import {
	TypeÉtablissement,
} from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';

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
				<RésultatRechercherAccompagnementDesktop établissement={établissement} onContactClick={() => ({})}/>
			</DependenciesProvider>);

			// THEN
			expect(screen.queryByText(email)).not.toBeInTheDocument();
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
				<RésultatRechercherAccompagnementDesktop établissement={établissement} onContactClick={() => ({})}/>
			</DependenciesProvider>);

			// THEN
			expect(screen.getByText(email)).toBeInTheDocument();
		});
	});
});

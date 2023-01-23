/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';

import { InformationsGénérales } from '~/client/components/features/Logement/Consulter/InformationsGénérales';
import { uneAnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.fixture';

describe('<InformationsGénérales />', () => {
	describe('Prix', () => {
		it('affiche le prix', async () => {
			const annonce = uneAnnonceDeLogement();
			annonce.prix = 500;
			render(<InformationsGénérales annonce={annonce} />);

			const prixRow = screen.getByRole('row', { name: /Prix/i });
			expect(prixRow).toHaveTextContent(/500€CC\/mois/i);
			const abbreviation = screen.getByText(/CC/i);
			expect(abbreviation).toHaveAttribute('title', 'Charges Comprises');
		});
		it('affiche la bonne devise dans le prix', async () => {
			const annonce = uneAnnonceDeLogement();
			annonce.devise = '$';
			render(<InformationsGénérales annonce={annonce} />);

			const prixRow = screen.getByRole('row', { name: /Prix/i });
			expect(prixRow).toHaveTextContent(/\$/i);
		});
		it('affiche les charges', async () => {
			const annonce = uneAnnonceDeLogement();
			annonce.charge = 500;
			render(<InformationsGénérales annonce={annonce} />);

			const chargesRow = screen.getByRole('row', { name: /Charges/i });
			expect(chargesRow).toHaveTextContent(/500€/i);
		});
		it('masque la ligne quand pas de charges', async () => {
			const annonce = uneAnnonceDeLogement();
			annonce.charge = undefined;
			render(<InformationsGénérales annonce={annonce} />);

			const chargesRow = screen.queryByRole('row', { name: /Charges/i });
			expect(chargesRow).not.toBeInTheDocument();
		});
		it('affiche la bonne devise dans les charges', async () => {
			const annonce = uneAnnonceDeLogement();
			annonce.devise = '$';
			render(<InformationsGénérales annonce={annonce} />);

			const chargesRow = screen.getByRole('row', { name: /Charges/i });
			expect(chargesRow).toHaveTextContent(/\$/i);
		});
	});
	describe('Informations du logement', () => {
		it('affiche la surface', async () => {
			const annonce = uneAnnonceDeLogement();
			annonce.surface = 50;
			render(<InformationsGénérales annonce={annonce} />);

			const surfaceRow = screen.getByRole('row', { name: /Surface/i });
			expect(surfaceRow).toHaveTextContent(/50m2/i);
		});
	});
});

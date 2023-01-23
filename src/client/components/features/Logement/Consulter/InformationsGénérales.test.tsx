/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';

import { InformationsGénérales } from '~/client/components/features/Logement/Consulter/InformationsGénérales';
import { uneAnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.fixture';

describe('<InformationsGénérales />', () => {
	it('affiche le prix', async () => {
		const annonce = uneAnnonceDeLogement();
		annonce.prix = 500;
		render(<InformationsGénérales annonce={annonce} />);

		const prixRow = screen.getByRole('row', { name: /Prix/i });
		expect(prixRow).toHaveTextContent(/500€CC\/mois/i);
		const abbreviation = screen.getByText(/CC/i);
		expect(abbreviation).toHaveAttribute('title', 'Charges Comprises');
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
});

/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { ConsulterAnnonce } from '~/client/components/features/Logement/Consulter/ConsulterAnnonce';
import { uneAnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.fixture';

describe('<ConsulterAnnonce />', () => {
	it("affiche le titre de l'annonce", async () => {
		const annonceDeLogement = uneAnnonceDeLogement();
		annonceDeLogement.titre = 'Super T3 dans le centre de Paris';

		await render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
		const titre = screen.getByRole('heading', {
			level: 1,
		});

		expect(titre).toBeVisible();
		expect(titre).toHaveTextContent('Super T3 dans le centre de Paris');
	});
	it('affiche le type de logement', async () => {
		const annonceDeLogement = uneAnnonceDeLogement();
		annonceDeLogement.type = 'Location';
		annonceDeLogement.typeBien = 'Appartement';

		await render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
		const type = screen.getByText(/Location - Appartement/i);

		expect(type).toBeVisible();
	});
	it('affiche la date de mise à jour au bon format', async () => {
		const annonceDeLogement = uneAnnonceDeLogement();
		annonceDeLogement.dateDeMiseAJour = new Date(2020, 1, 1).toISOString();

		await render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
		const date = screen.getByText(/Annonce mise à jour le/i);

		expect(date).toBeVisible();
		expect(date).toHaveTextContent(/Annonce mise à jour le 01.02.2020/i);
	});
	describe('description du logement', () => {
		it('affiche la description du logement', async () => {
			const annonceDeLogement = uneAnnonceDeLogement();
			annonceDeLogement.description = "C'est un super logement !";

			await render(<ConsulterAnnonce annonceDeLogement={annonceDeLogement} />);
			const description = screen.getByText(/C'est un super logement !/i);

			expect(description).toBeVisible();
		});
	});
});

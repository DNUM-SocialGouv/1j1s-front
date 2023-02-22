/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import { Detail } from '~/client/components/features/Alternance/Detail/Detail';
import { anAlternanceMatcha, uneAlternance } from '~/server/alternances/domain/alternance.fixture';

describe('<Detail />', () => {
	it('affiche le titre de l’annonce comme titre principal', () => {
		const annonce = anAlternanceMatcha({ titre: 'Ma super alternance' });

		render(<Detail annonce={annonce} />);

		const titre = screen.getByRole('heading', { level: 1 });
		expect(titre).toHaveTextContent('Ma super alternance');
		expect(titre).toBeVisible();
	});
	it('affiche le nom de l’entreprise', () => {
		const annonce = anAlternanceMatcha({ nomEntreprise: 'Ma super entreprise' });

		render(<Detail annonce={annonce} />);

		const entreprise = screen.getByText('Ma super entreprise');
		expect(entreprise).toBeVisible();
	});
	it('affiche la liste de tags', async () => {
		const annonce = anAlternanceMatcha({ localisation: 'Paris (75001)', niveauRequis: 'CAP', typeDeContrat: 'CDD' });

		render(<Detail annonce={annonce} />);

		const tags = within(screen.getByRole('list')).getAllByRole('listitem');
		expect(tags[0]).toHaveTextContent('Paris (75001)');
		expect(tags[1]).toHaveTextContent('CDD');
		expect(tags[2]).toHaveTextContent('CAP');
	});
});

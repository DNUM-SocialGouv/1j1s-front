/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import { Detail } from '~/client/components/features/Alternance/Detail/Detail';
import { anAlternanceMatcha } from '~/server/alternances/domain/alternance.fixture';
import * as queries from '~/test-utils';

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
	it('affiche la description du contrat', async () => {
		const annonce = anAlternanceMatcha({ description: "C'est une super alternance !" });

		const { getByDescriptionTerm } = render(<Detail annonce={annonce} />, { queries });

		const description = getByDescriptionTerm('Description du contrat');
		expect(description).toBeVisible();
		expect(description).toHaveTextContent("C'est une super alternance !");
	});
	it('n’affiche pas la description du contrat lorsque non-renseignée', async () => {
		const annonce = anAlternanceMatcha({ description: undefined });

		render(<Detail annonce={annonce} />);

		const term = screen.queryByText('Description du contrat');
		expect(term).not.toBeInTheDocument();
	});
});

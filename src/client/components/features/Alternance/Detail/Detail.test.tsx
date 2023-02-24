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
	it('affiche la description du contrat', async () => {
		const annonce = anAlternanceMatcha({ description: "C'est une super alternance !" });

		const { getByDescriptionTerm } = render(<Detail annonce={annonce} />, { queries });

		const description = getByDescriptionTerm('Description du contrat');
		expect(description).toBeVisible();
		expect(description).toHaveTextContent("C'est une super alternance !");
	});
	it('n’affiche pas le bloc de description du contrat lorsque non-renseignée', async () => {
		const annonce = anAlternanceMatcha({ description: undefined });

		render(<Detail annonce={annonce} />);

		const term = screen.queryByText('Description du contrat');
		expect(term).not.toBeInTheDocument();
	});
	it('affiche les compétences requises', async () => {
		const annonce = anAlternanceMatcha({ compétences: ['Savoir faire des trucs', 'Connaître des choses'] });

		const { getByDescriptionTerm } = render(<Detail annonce={annonce} />, { queries });

		const description = getByDescriptionTerm('Connaissances et compétences requises');
		expect(description).toBeVisible();
		const compétencesList = within(description).getByRole('list');
		expect(compétencesList).toBeVisible();
		const compétences = within(compétencesList).getAllByRole('listitem');
		expect(compétences).toHaveLength(2);
		expect(compétences[0]).toHaveTextContent('Savoir faire des trucs');
		expect(compétences[1]).toHaveTextContent('Connaître des choses');
	});
	it('n’affiche pas le bloc des compétences requises lorsque non-renseignées', async () => {
		const annonce = anAlternanceMatcha({ compétences: undefined });

		render(<Detail annonce={annonce} />);

		const term = screen.queryByText('Connaissances et compétences requises');
		expect(term).not.toBeInTheDocument();
	});
	it('n’affiche pas le bloc des compétences requises lorsque aucune compétence requise', async () => {
		const annonce = anAlternanceMatcha({ compétences: [] });

		render(<Detail annonce={annonce} />);

		const term = screen.queryByText('Connaissances et compétences requises');
		expect(term).not.toBeInTheDocument();
	});
	it('affiche le niveau requis', async () => {
		const annonce = anAlternanceMatcha({ niveauRequis: 'CAP' });

		const { getByDescriptionTerm } = render(<Detail annonce={annonce} />, { queries });

		const niveauRequis = getByDescriptionTerm('Niveau requis');
		expect(niveauRequis).toBeVisible();
		expect(niveauRequis).toHaveTextContent('CAP');
	});
	it('n’affiche pas le bloc de niveau requis lorsque non-renseignées', async () => {
		const annonce = anAlternanceMatcha({ niveauRequis: undefined });

		render(<Detail annonce={annonce} />);

		const term = screen.queryByText('Niveau requis');
		expect(term).not.toBeInTheDocument();
	});
});

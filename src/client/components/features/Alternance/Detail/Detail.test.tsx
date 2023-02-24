/**
 * @jest-environment jsdom
 */

import { queries as defaultQueries,render, screen, within } from '@testing-library/react';

import { Detail } from '~/client/components/features/Alternance/Detail/Detail';
import { aDetailAlternance } from '~/client/components/features/Alternance/Detail/DetailAlternance.fixture';
import { LocaleProvider } from '~/client/context/locale.context';
import * as queries from '~/test-utils';

describe('<Detail />', () => {
	it('affiche le titre de l’annonce comme titre principal', () => {
		const annonce = aDetailAlternance({ titre: 'Ma super alternance' });

		render(<Detail annonce={annonce}/>);

		const titre = screen.getByRole('heading', { level: 1 });
		expect(titre).toHaveTextContent('Ma super alternance');
		expect(titre).toBeVisible();
	});
	it('affiche le nom de l’entreprise', () => {
		const annonce = aDetailAlternance({ entreprise: { nom: 'Ma super entreprise' } });

		render(<Detail annonce={annonce}/>);

		const entreprise = screen.getByText('Ma super entreprise');
		expect(entreprise).toBeVisible();
	});
	it('affiche la description du contrat', async () => {
		const annonce = aDetailAlternance({ description: "C'est une super alternance !" });

		const { getByDescriptionTerm } = render(<Detail annonce={annonce}/>, { queries });

		const description = getByDescriptionTerm('Description du contrat');
		expect(description).toBeVisible();
		expect(description).toHaveTextContent("C'est une super alternance !");
	});
	it('n’affiche pas le bloc de description du contrat lorsque non-renseignée', async () => {
		const annonce = aDetailAlternance({ description: undefined });

		render(<Detail annonce={annonce}/>);

		const term = screen.queryByText('Description du contrat');
		expect(term).not.toBeInTheDocument();
	});
	it('affiche les compétences requises', async () => {
		const annonce = aDetailAlternance({ compétences: ['Savoir faire des trucs', 'Connaître des choses'] });

		const { getByDescriptionTerm } = render(<Detail annonce={annonce}/>, { queries });

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
		const annonce = aDetailAlternance({ compétences: undefined });

		render(<Detail annonce={annonce}/>);

		const term = screen.queryByText('Connaissances et compétences requises');
		expect(term).not.toBeInTheDocument();
	});
	it('n’affiche pas le bloc des compétences requises lorsque aucune compétence requise', async () => {
		const annonce = aDetailAlternance({ compétences: [] });

		render(<Detail annonce={annonce}/>);

		const term = screen.queryByText('Connaissances et compétences requises');
		expect(term).not.toBeInTheDocument();
	});
	it('affiche le niveau requis', async () => {
		const annonce = aDetailAlternance({ niveauRequis: 'CAP' });

		const { getByDescriptionTerm } = render(<Detail annonce={annonce}/>, { queries });

		const niveauRequis = getByDescriptionTerm('Niveau requis');
		expect(niveauRequis).toBeVisible();
		expect(niveauRequis).toHaveTextContent('CAP');
	});
	it('n’affiche pas le bloc de niveau requis lorsque non-renseignées', async () => {
		const annonce = aDetailAlternance({ niveauRequis: undefined });

		render(<Detail annonce={annonce}/>);

		const term = screen.queryByText('Niveau requis');
		expect(term).not.toBeInTheDocument();
	});
	it('affiche la date de début de contrat', async () => {
		const annonce = aDetailAlternance({ dateDébut: new Date('2022-01-01') });

		const { getByDescriptionTerm } = render(<LocaleProvider value={'fr'}><Detail
			annonce={annonce}/></LocaleProvider>, { queries });

		const dateDébut = getByDescriptionTerm('Début du contrat');
		expect(dateDébut).toHaveTextContent('1 janvier 2022');
		expect(dateDébut).toBeVisible();
		const time = within(dateDébut).getByText('1 janvier 2022');
		expect(time).toHaveAttribute('datetime', '2022-01-01');
	});
	it('n’affiche pas le bloc de la date de début de contrat lorsque non-renseignées', async () => {
		const annonce = aDetailAlternance({ dateDébut: undefined });

		render(<Detail annonce={annonce}/>);

		const term = screen.queryByText('Début du contrat');
		expect(term).not.toBeInTheDocument();
	});
	it('affiche le type de contrat', async () => {
		const annonce = aDetailAlternance({ typeDeContrat: 'Alternance' });

		const { getByDescriptionTerm } = render(<Detail annonce={annonce}/>, { queries });

		const typeDeContrat = getByDescriptionTerm('Type de contrat');
		expect(typeDeContrat).toBeVisible();
		expect(typeDeContrat).toHaveTextContent('Alternance');
	});
	it('n’affiche pas le bloc de type de contrat lorsque non-renseignées', async () => {
		const annonce = aDetailAlternance({ typeDeContrat: undefined });

		render(<Detail annonce={annonce}/>);

		const term = screen.queryByText('Type de contrat');
		expect(term).not.toBeInTheDocument();
	});
	it('affiche la durée du contrat', async () => {
		const annonce = aDetailAlternance({ durée: 4 });

		const { getByDescriptionTerm } = render(<Detail annonce={annonce}/>, { queries });

		const durée = getByDescriptionTerm('Durée du contrat');
		expect(durée).toHaveTextContent('4 ans');
		expect(durée).toBeVisible();
		const time = within(durée).getByText('4 ans');
		const durationISO = 'P4Y';
		expect(time).toHaveAttribute('datetime', durationISO);
	});
	it('conjugue au singulier quand durée d’un an', async () => {
		const annonce = aDetailAlternance({ durée: 1 });

		const { getByDescriptionTerm } = render(<Detail annonce={annonce}/>, { queries });

		const durée = getByDescriptionTerm('Durée du contrat');
		expect(durée).toBeVisible();
		expect(durée).toHaveTextContent(/1 an$/);
	});
	it('n’affiche pas le bloc de la durée du contrat lorsque non-renseignées', async () => {
		const annonce = aDetailAlternance({ durée: undefined });

		render(<Detail annonce={annonce}/>);

		const term = screen.queryByText('Durée du contrat');
		expect(term).not.toBeInTheDocument();
	});
	it('affiche le rythme de l’alternance', async () => {
		const annonce = aDetailAlternance({ rythmeAlternance: '1 jour par semaine' });

		const { getByDescriptionTerm } = render(<Detail annonce={annonce}/>, { queries });

		const rythmeAlternance = getByDescriptionTerm('Rythme de l’alternance');
		expect(rythmeAlternance).toBeVisible();
		expect(rythmeAlternance).toHaveTextContent('1 jour par semaine');
	});
	it('n’affiche pas le bloc de rythme de l’alternance lorsque non-renseignées', async () => {
		const annonce = aDetailAlternance({ rythmeAlternance: undefined });

		render(<Detail annonce={annonce}/>);

		const term = screen.queryByText('Rythme de l’alternance');
		expect(term).not.toBeInTheDocument();
	});
	it('affiche les contacts d’entreprise', async () => {
		const annonce = aDetailAlternance({
			entreprise: {
				localisation: 'Paris (75001)',
				téléphone: '0123456789',
			},
		});

		const { getByDescriptionTerm } = render(<Detail annonce={annonce}/>, { queries });

		const entreprise = getByDescriptionTerm('Informations sur l’entreprise');
		expect(entreprise).toBeVisible();
		const adresse = within(entreprise, { ...queries, ...defaultQueries }).getByDescriptionTerm('Adresse');
		expect(adresse).toHaveTextContent('Paris (75001)');
		const contact = within(entreprise, { ...queries, ...defaultQueries }).getByDescriptionTerm('Contact');
		expect(contact).toHaveTextContent('0123456789');
	});
	it('n’affiche pas le bloc des contacts d’entreprise lorsqu’aucun n’est renseignées', async () => {
		const annonce = aDetailAlternance({ entreprise: {} });

		render(<Detail annonce={annonce}/>);

		const term = screen.queryByText('Informations sur l’entreprise');
		expect(term).not.toBeInTheDocument();
	});
	it('n’affiche pas l’adresse quand non-renseignées', async () => {
		const annonce = aDetailAlternance({ entreprise: {
			localisation: undefined,
			téléphone: '0123456789',
		} });

		const { getByDescriptionTerm } = render(<Detail annonce={annonce}/>, { queries });

		const entreprise = getByDescriptionTerm('Informations sur l’entreprise');
		expect(entreprise).toBeVisible();
		const adresse = within(entreprise)
			.queryByText('Adresse');
		expect(adresse).not.toBeInTheDocument();
		const contact = within(entreprise, { ...queries, ...defaultQueries }).getByDescriptionTerm('Contact');
		expect(contact).toBeVisible();
	});
	it('n’affiche pas le téléphone quand non-renseignées', async () => {
		const annonce = aDetailAlternance({ entreprise: {
			localisation: 'Paris',
			téléphone: undefined,
		} });

		const { getByDescriptionTerm } = render(<Detail annonce={annonce}/>, { queries });

		const entreprise = getByDescriptionTerm('Informations sur l’entreprise');
		expect(entreprise).toBeVisible();
		const adresse = within(entreprise, { ...queries, ...defaultQueries }).getByDescriptionTerm('Adresse');
		expect(adresse).toBeVisible();
		const contact = within(entreprise)
			.queryByText('Contact');
		expect(contact).not.toBeInTheDocument();
	});
});

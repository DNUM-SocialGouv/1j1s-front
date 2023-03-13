/**
 * @jest-environment jsdom
 */

import { queries as defaultQueries, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Detail } from '~/client/components/features/Alternance/Detail/Detail';
import { aDetailAlternance } from '~/client/components/features/Alternance/Detail/DetailAlternance.fixture';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { LocaleProvider } from '~/client/context/locale.context';
import { Alternance } from '~/server/alternances/domain/alternance';
import * as queries from '~/test-utils';

describe('<Detail />', () => {
	beforeEach(() => {
		mockUseRouter({});
	});

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
	describe('pour une offre Pôle Emploi', () => {
		it('affiche le lien pour postuler', () => {
			const annonce = aDetailAlternance({ lienPostuler: 'url', source: Alternance.Source.POLE_EMPLOI });

			render(<Detail annonce={annonce}/>);

			const lien = screen.getByRole('link', { name: 'Postuler sur Pôle emploi' });

			expect(lien).toBeVisible();
			expect(lien).toHaveAttribute('href', 'url');
		});
		it('n’affiche pas le lien pour postuler lorsque l’url n’est pas renseignée', () => {
			const annonce = aDetailAlternance({ lienPostuler: undefined, source: Alternance.Source.POLE_EMPLOI });

			render(<Detail annonce={annonce}/>);

			const lien = screen.queryByRole('link', { name: 'Postuler sur Pôle emploi' });

			expect(lien).not.toBeInTheDocument();
		});
		it('n’affiche pas un bouton pour postuler a une offre Matcha', () => {
			const url = 'http://url.com/postuler?caller=1jeune1solution&itemId=123&type=matcha';
			const annonce = aDetailAlternance({ id: '123', lienPostuler: url, source: Alternance.Source.POLE_EMPLOI });

			render(<Detail annonce={annonce}/>);

			const bouton = screen.queryByRole('button', { name: /Postuler/i });

			expect(bouton).not.toBeInTheDocument();
		});
	});
	describe('pour une offre Matcha', () => {
		it('n’affiche pas le lien pour postuler a une offre Pôle emploi', () => {
			const annonce = aDetailAlternance({ lienPostuler: 'url', source: Alternance.Source.MATCHA });

			render(<Detail annonce={annonce}/>);

			const lien = screen.queryByRole('link', { name: 'Postuler sur Pôle emploi' });

			expect(lien).not.toBeInTheDocument();
		});
		it('affiche un bouton pour postuler affichant une iframe LBA', async () => {
			process.env = {
				...process.env,
				NEXT_PUBLIC_LA_BONNE_ALTERNANCE_URL: 'http://url.com/',
			};
			const user = userEvent.setup();
			const url = 'http://url.com/postuler?caller=1jeune1solution&itemId=123&type=matcha';
			const annonce = aDetailAlternance({ id: '123', lienPostuler: url, source: Alternance.Source.MATCHA });

			render(<Detail annonce={annonce}/>);

			const bouton = screen.getByRole('button', { name: /Postuler/i });
			expect(bouton).toBeVisible();
			await user.click(bouton);

			const iframe = screen.getByTitle('Formulaire de candidature à l’annonce');

			expect(iframe).toBeVisible();
			expect(iframe).toHaveAttribute('src', url);
		});
		it('n’affiche pas un bouton pour postuler lorsque l’annonce n’a pas d’id', () => {
			const annonce = aDetailAlternance({ id: undefined });

			render(<Detail annonce={annonce}/>);

			const bouton = screen.queryByRole('button', { name: /Postuler/i });

			expect(bouton).not.toBeInTheDocument();
		});
	});
	it('affiche la description du contrat', () => {
		const annonce = aDetailAlternance({ description: "C'est une super alternance !" });

		const { getByDescriptionTerm } = render(<Detail annonce={annonce}/>, { queries });

		const description = getByDescriptionTerm('Description du poste');
		expect(description).toBeVisible();
		expect(description).toHaveTextContent("C'est une super alternance !");
	});
	it('n’affiche pas le bloc de description du contrat lorsque non-renseignée', () => {
		const annonce = aDetailAlternance({ description: undefined });

		render(<Detail annonce={annonce}/>);

		const term = screen.queryByText('Description du contrat');
		expect(term).not.toBeInTheDocument();
	});
	it('affiche les compétences requises', () => {
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
	it('n’affiche pas le bloc des compétences requises lorsque non-renseignées', () => {
		const annonce = aDetailAlternance({ compétences: undefined });

		render(<Detail annonce={annonce}/>);

		const term = screen.queryByText('Connaissances et compétences requises');
		expect(term).not.toBeInTheDocument();
	});
	it('n’affiche pas le bloc des compétences requises lorsque aucune compétence requise', () => {
		const annonce = aDetailAlternance({ compétences: [] });

		render(<Detail annonce={annonce}/>);

		const term = screen.queryByText('Connaissances et compétences requises');
		expect(term).not.toBeInTheDocument();
	});
	it('affiche le niveau requis', () => {
		const annonce = aDetailAlternance({ niveauRequis: 'CAP' });

		const { getByDescriptionTerm } = render(<Detail annonce={annonce}/>, { queries });

		const niveauRequis = getByDescriptionTerm('Niveau requis');
		expect(niveauRequis).toBeVisible();
		expect(niveauRequis).toHaveTextContent('CAP');
	});
	it('n’affiche pas le bloc de niveau requis lorsque non-renseignées', () => {
		const annonce = aDetailAlternance({ niveauRequis: undefined });

		render(<Detail annonce={annonce}/>);

		const term = screen.queryByText('Niveau requis');
		expect(term).not.toBeInTheDocument();
	});
	it('affiche la date de début de contrat', () => {
		const annonce = aDetailAlternance({ dateDébut: new Date('2022-01-01') });

		const { getByDescriptionTerm } = render(<LocaleProvider value={'fr'}><Detail
			annonce={annonce}/></LocaleProvider>, { queries });

		const dateDébut = getByDescriptionTerm('Début du contrat');
		expect(dateDébut).toHaveTextContent('1 janvier 2022');
		expect(dateDébut).toBeVisible();
		const time = within(dateDébut).getByText('1 janvier 2022');
		expect(time).toHaveAttribute('datetime', '2022-01-01');
	});
	it('n’affiche pas le bloc de la date de début de contrat lorsque non-renseignées', () => {
		const annonce = aDetailAlternance({ dateDébut: undefined });

		render(<Detail annonce={annonce}/>);

		const term = screen.queryByText('Début du contrat');
		expect(term).not.toBeInTheDocument();
	});
	it('affiche le type de contrat', () => {
		const annonce = aDetailAlternance({ typeDeContrat: ['Alternance'] });

		const { getByDescriptionTerm } = render(<Detail annonce={annonce}/>, { queries });

		const typeDeContrat = getByDescriptionTerm('Type de contrat');
		expect(typeDeContrat).toBeVisible();
		expect(typeDeContrat).toHaveTextContent('Alternance');
	});
	it('n’affiche pas le bloc de type de contrat lorsque non-renseignées', () => {
		const annonce = aDetailAlternance({ typeDeContrat: undefined });

		render(<Detail annonce={annonce}/>);

		const term = screen.queryByText('Type de contrat');
		expect(term).not.toBeInTheDocument();
	});
	it('affiche la nature du contrat', () => {
		const annonce = aDetailAlternance({ natureDuContrat: 'CDI' });

		const { getByDescriptionTerm } = render(<Detail annonce={annonce}/>, { queries });

		const typeDeContrat = getByDescriptionTerm('Nature du contrat');
		expect(typeDeContrat).toBeVisible();
		expect(typeDeContrat).toHaveTextContent('CDI');
	});
	it('n’affiche pas le bloc de nature du contrat lorsque non-renseignées', () => {
		const annonce = aDetailAlternance({ natureDuContrat: undefined });

		render(<Detail annonce={annonce}/>);

		const term = screen.queryByText('Nature du contrat');
		expect(term).not.toBeInTheDocument();
	});
	it('affiche la durée du contrat', () => {
		const annonce = aDetailAlternance({ durée: '4 ans' });

		const { getByDescriptionTerm } = render(<Detail annonce={annonce}/>, { queries });

		const durée = getByDescriptionTerm('Durée du contrat');
		expect(durée).toHaveTextContent('4 ans');
		expect(durée).toBeVisible();
		const time = within(durée).getByText('4 ans');
		expect(time).toBeVisible();
	});
	it('n’affiche pas le bloc de la durée du contrat lorsque non-renseignées', () => {
		const annonce = aDetailAlternance({ durée: undefined });

		render(<Detail annonce={annonce}/>);

		const term = screen.queryByText('Durée du contrat');
		expect(term).not.toBeInTheDocument();
	});
	it('affiche le rythme de l’alternance', () => {
		const annonce = aDetailAlternance({ rythmeAlternance: '1 jour par semaine' });

		const { getByDescriptionTerm } = render(<Detail annonce={annonce}/>, { queries });

		const rythmeAlternance = getByDescriptionTerm('Rythme de l’alternance');
		expect(rythmeAlternance).toBeVisible();
		expect(rythmeAlternance).toHaveTextContent('1 jour par semaine');
	});
	it('n’affiche pas le bloc de rythme de l’alternance lorsque non-renseignées', () => {
		const annonce = aDetailAlternance({ rythmeAlternance: undefined });

		render(<Detail annonce={annonce}/>);

		const term = screen.queryByText('Rythme de l’alternance');
		expect(term).not.toBeInTheDocument();
	});
	it('affiche les contacts d’entreprise', () => {
		const annonce = aDetailAlternance({
			entreprise: {
				adresse: 'Paris (75001)',
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
	it('n’affiche pas le bloc des contacts d’entreprise lorsqu’aucun n’est renseignées', () => {
		const annonce = aDetailAlternance({ entreprise: {} });

		render(<Detail annonce={annonce}/>);

		const term = screen.queryByText('Informations sur l’entreprise');
		expect(term).not.toBeInTheDocument();
	});
	it('n’affiche pas l’adresse quand non-renseignées', () => {
		const annonce = aDetailAlternance({
			entreprise: {
				adresse: undefined,
				téléphone: '0123456789',
			},
		});

		const { getByDescriptionTerm } = render(<Detail annonce={annonce}/>, { queries });

		const entreprise = getByDescriptionTerm('Informations sur l’entreprise');
		expect(entreprise).toBeVisible();
		const adresse = within(entreprise)
			.queryByText('Adresse');
		expect(adresse).not.toBeInTheDocument();
		const contact = within(entreprise, { ...queries, ...defaultQueries }).getByDescriptionTerm('Contact');
		expect(contact).toBeVisible();
	});
	it('n’affiche pas le téléphone quand non-renseignées', () => {
		const annonce = aDetailAlternance({
			entreprise: {
				adresse: 'Paris',
				téléphone: undefined,
			},
		});

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

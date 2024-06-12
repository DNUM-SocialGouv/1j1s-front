/**
 * @jest-environment jsdom
 */

import { queries as defaultQueries, render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { Detail } from '~/client/components/features/Alternance/Detail/Detail';
import { aDetailAlternance } from '~/client/components/features/Alternance/Detail/DetailAlternance.fixture';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aDateService } from '~/client/services/date/date.service.fixture';
import { Alternance } from '~/server/alternances/domain/alternance';
import { AlternanceStatus } from '~/server/alternances/infra/status';
import { queries } from '~/test-utils';

const OFFER_FILLED_TEXT = 'offre déjà pourvue';

describe('<Detail />', () => {
	beforeEach(() => {
		mockUseRouter({});
	});

	it('affiche le titre de l’annonce comme titre principal', () => {
		const annonce = aDetailAlternance({ titre: 'Ma super alternance' });

		render(<DependenciesProvider dateService={aDateService()}>
			<Detail annonce={annonce}/>
		</DependenciesProvider>);

		const titre = screen.getByRole('heading', { level: 1 });
		expect(titre).toHaveTextContent('Ma super alternance');
		expect(titre).toBeVisible();
	});
	it('affiche le nom de l’entreprise', () => {
		const annonce = aDetailAlternance({ entreprise: { nom: 'Ma super entreprise' } });

		render(<DependenciesProvider dateService={aDateService()}>
			<Detail annonce={annonce}/>
		</DependenciesProvider>);

		const entreprise = screen.getByText('Ma super entreprise');
		expect(entreprise).toBeVisible();
	});
	describe('pour une offre France Travail', () => {
		it('affiche le lien pour postuler', () => {
			const annonce = aDetailAlternance({ lienPostuler: 'https://example.com', source: Alternance.Source.FRANCE_TRAVAIL });

			render(<DependenciesProvider dateService={aDateService()}>
				<Detail annonce={annonce}/>
			</DependenciesProvider>);

			const lien = screen.getByRole('link', { name: 'Postuler sur France Travail - nouvelle fenêtre' });

			expect(lien).toBeVisible();
			expect(lien).toHaveAttribute('href', 'https://example.com');
		});
		it('n’affiche pas le lien pour postuler lorsque l’url n’est pas renseignée', () => {
			const annonce = aDetailAlternance({ lienPostuler: undefined, source: Alternance.Source.FRANCE_TRAVAIL });

			render(<DependenciesProvider dateService={aDateService()}>
				<Detail annonce={annonce}/>
			</DependenciesProvider>);

			const lien = screen.queryByRole('link', { name: 'Postuler sur France Travail - nouvelle fenêtre' });

			expect(lien).not.toBeInTheDocument();
		});
		it('n’affiche pas un bouton pour postuler a une offre Matcha', () => {
			const url = 'http://url.com/postuler?caller=1jeune1solution&itemId=123&type=matcha';
			const annonce = aDetailAlternance({ id: '123', lienPostuler: url, source: Alternance.Source.FRANCE_TRAVAIL });

			render(<DependenciesProvider dateService={aDateService()}>
				<Detail annonce={annonce}/>
			</DependenciesProvider>);

			const bouton = screen.queryByRole('button', { name: /Postuler/i });

			expect(bouton).not.toBeInTheDocument();
		});
	});
	describe('pour une offre Matcha', () => {
		it('n’affiche pas le lien pour postuler a une offre France Travail', () => {
			const annonce = aDetailAlternance({ lienPostuler: 'url', source: Alternance.Source.MATCHA });

			render(<DependenciesProvider dateService={aDateService()}>
				<Detail annonce={annonce}/>
			</DependenciesProvider>);

			const lien = screen.queryByRole('link', { name: 'Postuler sur France Travail - nouvelle fenêtre' });

			expect(lien).not.toBeInTheDocument();
		});

		describe('état de l‘offre actif', () => {
			it('n‘affiche pas l‘information que l‘offre est désactivée', () => {
				const annonce = aDetailAlternance({ status: AlternanceStatus.ACTIVE });

				render(<DependenciesProvider dateService={aDateService()}>
					<Detail annonce={annonce}/>
				</DependenciesProvider>);

				const mention = screen.queryByText(OFFER_FILLED_TEXT);

				expect(mention).not.toBeInTheDocument();
			});
			it('affiche un bouton pour postuler affichant une modale avec l‘iframe LBA', async () => {
				process.env = {
					...process.env,
					NEXT_PUBLIC_LA_BONNE_ALTERNANCE_URL: 'http://url.com/',
				};
				const user = userEvent.setup();
				const url = 'http://url.com/postuler?caller=1jeune1solution&itemId=123&type=matcha';
				const annonce = aDetailAlternance({ id: '123', lienPostuler: url, source: Alternance.Source.MATCHA });

				render(<DependenciesProvider dateService={aDateService()}>
					<Detail annonce={annonce}/>
				</DependenciesProvider>);

				const bouton = screen.getByRole('button', { name: /Postuler/i });
				expect(bouton).toBeVisible();
				await user.click(bouton);

				expect(screen.getByRole('dialog', { name: 'Formulaire de candidature à l’annonce' })).toBeVisible();
				const iframe = screen.getByTitle('Formulaire de candidature à l’annonce');
				expect(iframe).toBeVisible();
				expect(iframe).toHaveAttribute('src', url);
			});
			it('n’affiche pas un bouton pour postuler lorsque l’annonce n’a pas d’id', () => {
				const annonce = aDetailAlternance({ id: undefined });

				render(<DependenciesProvider dateService={aDateService()}>
					<Detail annonce={annonce}/>
				</DependenciesProvider>);

				const bouton = screen.queryByRole('button', { name: /Postuler/i });

				expect(bouton).not.toBeInTheDocument();
			});
		});

		it('lorsque l‘offre est à l‘état annulé, affiche l‘information et pas de CTA', () => {
			const annonce = aDetailAlternance({ source: Alternance.Source.MATCHA, status: AlternanceStatus.CANCELED });

			render(<DependenciesProvider dateService={aDateService()}>
				<Detail annonce={annonce}/>
			</DependenciesProvider>);

			expect(screen.getByText(OFFER_FILLED_TEXT)).toBeVisible();
			expect(screen.queryByRole('button', { name: /Postuler/i })).not.toBeInTheDocument();
		});
	});
	it('affiche la description du contrat', () => {
		const annonce = aDetailAlternance({ description: "C'est une super alternance !" });

		const { getByDescriptionTerm } = render(<DependenciesProvider dateService={aDateService()}>
			<Detail annonce={annonce}/>
		</DependenciesProvider>, { queries });

		const description = getByDescriptionTerm('Description du poste');
		expect(description).toBeVisible();
		expect(description).toHaveTextContent("C'est une super alternance !");
	});
	describe('lorsque la description du contrat est sous forme html', () => {
		it('affiche la description du contrat', () => {
			const annonce = aDetailAlternance({ description: "<p>C'est une super alternance !</p>" });

			const { getByDescriptionTerm } = render(<DependenciesProvider dateService={aDateService()}>
				<Detail annonce={annonce}/>
			</DependenciesProvider>, { queries });

			const description = getByDescriptionTerm('Description du poste');
			expect(description).toBeVisible();
			expect(description).toHaveTextContent("C'est une super alternance !");
			expect(description).toContainHTML("<p>C'est une super alternance !</p>");
		});
	});
	it('n’affiche pas le bloc de description du contrat lorsque non-renseignée', () => {
		const annonce = aDetailAlternance({ description: undefined });

		render(<DependenciesProvider dateService={aDateService()}>
			<Detail annonce={annonce}/>
		</DependenciesProvider>);

		const term = screen.queryByText('Description du contrat');
		expect(term).not.toBeInTheDocument();
	});
	it('affiche la description de l’entreprise', () => {
		const annonce = aDetailAlternance({ descriptionEmployeur: "C'est une super entreprise !" });

		const { getByDescriptionTerm } = render(<DependenciesProvider dateService={aDateService()}>
			<Detail annonce={annonce}/>
		</DependenciesProvider>, { queries });

		const description = getByDescriptionTerm('Description de l’entreprise');
		expect(description).toBeVisible();
		expect(description).toHaveTextContent("C'est une super entreprise !");
	});
	describe('lorsque la description de l’entreprise est sous forme html', () => {
		it('affiche la description de l’entreprise', () => {
			const annonce = aDetailAlternance({ descriptionEmployeur: "<p>C'est une super entreprise !</p>" });

			const { getByDescriptionTerm } = render(<DependenciesProvider dateService={aDateService()}>
				<Detail annonce={annonce}/>
			</DependenciesProvider>, { queries });

			const description = getByDescriptionTerm('Description de l’entreprise');
			expect(description).toBeVisible();
			expect(description).toHaveTextContent("C'est une super entreprise !");
			expect(description).toContainHTML("<p>C'est une super entreprise !</p>");
		});
	});
	it('n’affiche pas le bloc de description de l’entreprise lorsque non-renseignée', () => {
		const annonce = aDetailAlternance({ descriptionEmployeur: undefined });

		render(<DependenciesProvider dateService={aDateService()}>
			<Detail annonce={annonce}/>
		</DependenciesProvider>);

		const term = screen.queryByText('Description de l’entreprise');
		expect(term).not.toBeInTheDocument();
	});
	it('affiche les compétences types du métier', () => {
		const annonce = aDetailAlternance({ compétences: ['Savoir faire des trucs', 'Connaître des choses'] });

		const { getByDescriptionTerm } = render(<DependenciesProvider dateService={aDateService()}>
			<Detail annonce={annonce}/>
		</DependenciesProvider>, { queries });

		const description = getByDescriptionTerm('Compétences types du métier');
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

		render(<DependenciesProvider dateService={aDateService()}>
			<Detail annonce={annonce}/>
		</DependenciesProvider>);

		const term = screen.queryByText('Compétences types du métier');
		expect(term).not.toBeInTheDocument();
	});
	it('n’affiche pas le bloc des compétences types du métier lorsque aucune compétence requise', () => {
		const annonce = aDetailAlternance({ compétences: [] });

		render(<DependenciesProvider dateService={aDateService()}>
			<Detail annonce={annonce}/>
		</DependenciesProvider>);

		const term = screen.queryByText('Compétences types du métier');
		expect(term).not.toBeInTheDocument();
	});
	it('affiche le niveau requis', () => {
		const annonce = aDetailAlternance({ niveauRequis: 'CAP' });

		const { getByDescriptionTerm } = render(<DependenciesProvider dateService={aDateService()}>
			<Detail annonce={annonce}/>
		</DependenciesProvider>, { queries });

		const niveauRequis = getByDescriptionTerm('Niveau visé en fin d’études');
		expect(niveauRequis).toBeVisible();
		expect(niveauRequis).toHaveTextContent('CAP');
	});
	it('n’affiche pas le bloc de niveau requis lorsque non-renseignées', () => {
		const annonce = aDetailAlternance({ niveauRequis: undefined });

		render(<DependenciesProvider dateService={aDateService()}>
			<Detail annonce={annonce}/>
		</DependenciesProvider>);

		const term = screen.queryByText('Niveau requis');
		expect(term).not.toBeInTheDocument();
	});
	it('affiche la date de début de contrat', () => {
		const annonce = aDetailAlternance({ dateDébut: new Date('2022-01-01') });
		const dateService = aDateService();
		jest.spyOn(dateService, 'formatToHumanReadableDate').mockReturnValue('1 janvier 2022');

		const { getByDescriptionTerm } = render(<DependenciesProvider dateService={dateService}>
			<Detail annonce={annonce}/>
		</DependenciesProvider>, { queries });

		const dateDébut = getByDescriptionTerm('Début du contrat');
		expect(dateDébut).toHaveTextContent('1 janvier 2022');
		expect(dateDébut).toBeVisible();
		const time = within(dateDébut).getByText('1 janvier 2022');
		expect(time).toHaveAttribute('datetime', '2022-01-01');
	});
	it('n’affiche pas le bloc de la date de début de contrat lorsque non-renseignées', () => {
		const annonce = aDetailAlternance({ dateDébut: undefined });

		render(<DependenciesProvider dateService={aDateService()}>
			<Detail annonce={annonce}/>
		</DependenciesProvider>);

		const term = screen.queryByText('Début du contrat');
		expect(term).not.toBeInTheDocument();
	});
	it('affiche le type de contrat', () => {
		const annonce = aDetailAlternance({ typeDeContrat: ['Alternance'] });

		const { getByDescriptionTerm } = render(<DependenciesProvider dateService={aDateService()}>
			<Detail annonce={annonce}/>
		</DependenciesProvider>, { queries });

		const typeDeContrat = getByDescriptionTerm('Type de contrat');
		expect(typeDeContrat).toBeVisible();
		expect(typeDeContrat).toHaveTextContent('Alternance');
	});
	it('n’affiche pas le bloc de type de contrat lorsque non-renseignées', () => {
		const annonce = aDetailAlternance({ typeDeContrat: undefined });

		render(<DependenciesProvider dateService={aDateService()}>
			<Detail annonce={annonce}/>
		</DependenciesProvider>);

		const term = screen.queryByText('Type de contrat');
		expect(term).not.toBeInTheDocument();
	});
	it('affiche la nature du contrat', () => {
		const annonce = aDetailAlternance({ natureDuContrat: 'CDI' });

		const { getByDescriptionTerm } = render(<DependenciesProvider dateService={aDateService()}>
			<Detail annonce={annonce}/>
		</DependenciesProvider>, { queries });

		const typeDeContrat = getByDescriptionTerm('Nature du contrat');
		expect(typeDeContrat).toBeVisible();
		expect(typeDeContrat).toHaveTextContent('CDI');
	});
	it('n’affiche pas le bloc de nature du contrat lorsque non-renseignées', () => {
		const annonce = aDetailAlternance({ natureDuContrat: undefined });

		render(<DependenciesProvider dateService={aDateService()}>
			<Detail annonce={annonce}/>
		</DependenciesProvider>);

		const term = screen.queryByText('Nature du contrat');
		expect(term).not.toBeInTheDocument();
	});
	it('affiche la durée du contrat', () => {
		const annonce = aDetailAlternance({ durée: '4 ans' });

		const { getByDescriptionTerm } = render(<DependenciesProvider dateService={aDateService()}>
			<Detail annonce={annonce}/>
		</DependenciesProvider>, { queries });

		const durée = getByDescriptionTerm('Durée du contrat');
		expect(durée).toHaveTextContent('4 ans');
		expect(durée).toBeVisible();
		const time = within(durée).getByText('4 ans');
		expect(time).toBeVisible();
	});
	it('n’affiche pas le bloc de la durée du contrat lorsque non-renseignées', () => {
		const annonce = aDetailAlternance({ durée: undefined });

		render(<DependenciesProvider dateService={aDateService()}>
			<Detail annonce={annonce}/>
		</DependenciesProvider>);

		const term = screen.queryByText('Durée du contrat');
		expect(term).not.toBeInTheDocument();
	});
	it('affiche le rythme de l’alternance', () => {
		const annonce = aDetailAlternance({ rythmeAlternance: '1 jour par semaine' });

		const { getByDescriptionTerm } = render(<DependenciesProvider dateService={aDateService()}>
			<Detail annonce={annonce}/>
		</DependenciesProvider>, { queries });

		const rythmeAlternance = getByDescriptionTerm('Rythme de l’alternance');
		expect(rythmeAlternance).toBeVisible();
		expect(rythmeAlternance).toHaveTextContent('1 jour par semaine');
	});
	it('n’affiche pas le bloc de rythme de l’alternance lorsque non-renseignées', () => {
		const annonce = aDetailAlternance({ rythmeAlternance: undefined });

		render(<DependenciesProvider dateService={aDateService()}>
			<Detail annonce={annonce}/>
		</DependenciesProvider>);

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

		const { getByDescriptionTerm } = render(<DependenciesProvider dateService={aDateService()}>
			<Detail annonce={annonce}/>
		</DependenciesProvider>, { queries });

		const entreprise = getByDescriptionTerm('Informations sur l’entreprise');
		expect(entreprise).toBeVisible();
		const adresse = within(entreprise, { ...queries, ...defaultQueries }).getByDescriptionTerm('Adresse');
		expect(adresse).toHaveTextContent('Paris (75001)');
		const contact = within(entreprise, { ...queries, ...defaultQueries }).getByDescriptionTerm('Contact');
		expect(contact).toHaveTextContent('0123456789');
	});
	it('n’affiche pas le bloc des contacts d’entreprise lorsqu’aucun n’est renseignées', () => {
		const annonce = aDetailAlternance({ entreprise: {} });

		render(<DependenciesProvider dateService={aDateService()}>
			<Detail annonce={annonce}/>
		</DependenciesProvider>);

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

		const { getByDescriptionTerm } = render(<DependenciesProvider dateService={aDateService()}>
			<Detail annonce={annonce}/>
		</DependenciesProvider>, { queries });

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

		const { getByDescriptionTerm } = render(<DependenciesProvider dateService={aDateService()}>
			<Detail annonce={annonce}/>
		</DependenciesProvider>, { queries });

		const entreprise = getByDescriptionTerm('Informations sur l’entreprise');
		expect(entreprise).toBeVisible();
		const adresse = within(entreprise, { ...queries, ...defaultQueries }).getByDescriptionTerm('Adresse');
		expect(adresse).toBeVisible();
		const contact = within(entreprise)
			.queryByText('Contact');
		expect(contact).not.toBeInTheDocument();
	});
});

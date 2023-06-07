/**
 * @jest-environment jsdom
 */
import {
	render,
	screen,
	within,
} from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import FaqPage from '~/pages/faq/index.page';
import { Question } from '~/server/cms/domain/FAQ.type';

const listeDeQuestionRéponse: Array<Question> = [
	{
		problématique: 'Comment constituer un dossier locatif ?',
		slug: 'Comment-constituer-un-dossier-locatif-?',
	}, {
		problématique: 'Je n’arrive pas à candidater à une offre d’emploi',
		slug: 'Je-n’arrive-pas-à-candidater-à-une-offre-d’emploi',
	},
];

describe('Page FAQ', () => {
	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('envoie les analytics de la page à son affichage', async () => {
		const analyticsService = anAnalyticsService();
		render(
			<DependenciesProvider analyticsService={analyticsService}>
				<FaqPage listeDeQuestionRéponse={listeDeQuestionRéponse}/>
			</DependenciesProvider>,
		);

		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith({
			page_template: 'contenu_statique',
			pagegroup: 'contenu_statique',
			pagelabel: 'contenu_statique',
			'segment-site': 'page_de_base',
		});
	});

	it('affiche le titre de la page', async () => {
		render(
			<DependenciesProvider analyticsService={anAnalyticsService()}>
				<FaqPage listeDeQuestionRéponse={listeDeQuestionRéponse}/>
			</DependenciesProvider>);

		const title = await screen.findByRole('heading', { level: 1 });
		expect(title).toHaveTextContent('FAQ - QUESTIONS FRÉQUEMMENT POSÉES');
	});

	it('affiche le sous titre de la page', async () => {
		render(
			<DependenciesProvider analyticsService={anAnalyticsService()}>
				<FaqPage listeDeQuestionRéponse={listeDeQuestionRéponse}/>
			</DependenciesProvider>);

		const sousTitre = await screen.findByRole('heading', { level: 2 });
		expect(sousTitre).toHaveTextContent('Que pouvons-nous faire pour vous ?');

	});

	it('affiche une liste de question', async () => {
		render(
			<DependenciesProvider analyticsService={anAnalyticsService()}>
				<FaqPage listeDeQuestionRéponse={listeDeQuestionRéponse}/>
			</DependenciesProvider>);

		const listeDeQuestion = screen.getByRole('list');
		expect(listeDeQuestion).toHaveAttribute('aria-label', 'Foire aux questions');

		const listItem = within(listeDeQuestion).getAllByRole('listitem');
		expect(listItem.length).toEqual(2);
	});

	it('affiche les questions sous forme de lien', async () => {
		render(
			<DependenciesProvider analyticsService={anAnalyticsService()}>
				<FaqPage listeDeQuestionRéponse={listeDeQuestionRéponse}/>
			</DependenciesProvider>);

		const listeDeQuestion = screen.getByRole('list');
		const questions = within(listeDeQuestion).getAllByRole('listitem');

		questions.forEach((question, index) => {
			const lien = within(question).getByRole('link');
			expect(lien).toHaveTextContent(listeDeQuestionRéponse[index].problématique);
			expect(lien).toHaveAttribute('href', `/faq/${listeDeQuestionRéponse[index].slug}`);
		});
	});

	describe('quand la list de question est vide', () => {
		it('n’affiche pas de liste', async () => {
			render(
				<DependenciesProvider analyticsService={anAnalyticsService()}>
					<FaqPage listeDeQuestionRéponse={[]}/>
				</DependenciesProvider>);

			const listeDeQuestion = screen.queryByRole('list');
			expect(listeDeQuestion).not.toBeInTheDocument();
		});
	});

	it('affiche le bouton de contact avec la bonne redirection', () => {

		const analyticsService = anAnalyticsService();
		render(
			<DependenciesProvider analyticsService={analyticsService}>
				<FaqPage listeDeQuestionRéponse={listeDeQuestionRéponse}/>
			</DependenciesProvider>,
		);

		const button = screen.getByRole('link', { name: 'Nous contacter' });
		expect(button).toBeVisible();
		expect(button).toHaveAttribute('href', 'mailto:contact-1j1s@sg.social.gouv.fr');
	});
});

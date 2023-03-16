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

	describe('quand le feature flip n‘est pas actif', () => {
		beforeEach(() => {
			process.env = {
				...process.env,
				NEXT_PUBLIC_FAQ_FEATURE: '0',
			};
		});

		it('ne retourne rien', async () => {
			render(
				<DependenciesProvider analyticsService={anAnalyticsService()}>
					<FaqPage isFeatureActive={false}/>
				</DependenciesProvider>,
			);

			const serviceIndisponible = screen.queryByText('Service Indisponible');
			expect(serviceIndisponible).toBeInTheDocument();
		});
	});

	describe('quand le feature flip est actif', () => {
		beforeEach(() => {
			process.env = {
				...process.env,
				NEXT_PUBLIC_FAQ_FEATURE: '1',
			};
		});

		it('envoie les analytics de la page à son affichage', async () => {
			const analyticsService = anAnalyticsService();
			render(
				<DependenciesProvider analyticsService={analyticsService}>
					<FaqPage isFeatureActive={true} listeDeQuestionRéponse={listeDeQuestionRéponse}/>
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
					<FaqPage isFeatureActive={true} listeDeQuestionRéponse={listeDeQuestionRéponse}/>
				</DependenciesProvider>);

			const title = await screen.findByRole('heading', { level: 1 });
			expect(title).toHaveTextContent('FAQ - QUESTIONS FRÉQUEMMENT POSÉES');
		});

		it('affiche le sous titre de la page', async () => {
			render(
				<DependenciesProvider analyticsService={anAnalyticsService()}>
					<FaqPage isFeatureActive={true} listeDeQuestionRéponse={listeDeQuestionRéponse}/>
				</DependenciesProvider>);

			const sousTitre = await screen.findByRole('heading', { level: 2 });
			expect(sousTitre).toHaveTextContent('Que pouvons-nous faire pour vous ?');

		});

		it('affiche une liste de question', async () => {
			render(
				<DependenciesProvider analyticsService={anAnalyticsService()}>
					<FaqPage isFeatureActive={true} listeDeQuestionRéponse={listeDeQuestionRéponse}/>
				</DependenciesProvider>);

			const listeDeQuestion = screen.getByRole('list');
			expect(listeDeQuestion).toHaveAttribute('aria-label', 'Foire aux questions');

			const listItem = within(listeDeQuestion).getAllByRole('listitem');
			expect(listItem.length).toEqual(2);
		});

		it('affiche les questions sous forme de lien', async () => {
			render(
				<DependenciesProvider analyticsService={anAnalyticsService()}>
					<FaqPage isFeatureActive={true} listeDeQuestionRéponse={listeDeQuestionRéponse}/>
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
						<FaqPage isFeatureActive={true} listeDeQuestionRéponse={[]}/>
					</DependenciesProvider>);

				const listeDeQuestion = screen.queryByRole('list');
				expect(listeDeQuestion).not.toBeInTheDocument();
			});
		});
	});
});

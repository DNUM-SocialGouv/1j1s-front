/**
 * @jest-environment jsdom
 */
import {
	render,
	screen,
	within,
} from '@testing-library/react';

import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import FaqPage from '~/pages/faq/index.page';
import { FoireAuxQuestions } from '~/server/cms/domain/foireAuxQuestions.type';

const faqList: Array<FoireAuxQuestions> = [
	{
		problématique: 'Comment constituer un dossier locatif ?',
		urlArticleRéponse: 'Comment-constituer-un-dossier-locatif-?',
	}, {
		problématique: 'Je n’arrive pas à candidater à une offre d’emploi',
		urlArticleRéponse: 'Je-n’arrive-pas-à-candidater-à-une-offre-d’emploi',
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
					render(<FaqPage isFeatureActive={false}/>
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
					<FaqPage/>
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
			render(<FaqPage isFeatureActive={true} faqList={faqList}/>);

			const title = await screen.findByRole('heading', { level: 1 });
			expect(title).toHaveTextContent('FAQ - QUESTIONS FRÉQUEMMENT POSÉES');
		});

		it('affiche le sous titre de la page', async () => {
			render(<FaqPage isFeatureActive={true} faqList={faqList}/>);

			const sousTitre = await screen.findByRole('heading', { level: 2 });
			expect(sousTitre).toHaveTextContent('Que pouvons-nous faire pour vous ?');

		});

		it('affiche une liste de question', async () => {
			render(<FaqPage isFeatureActive={true} faqList={faqList}/>);

			const listeDeQuestion = screen.getByRole('list');
			expect(listeDeQuestion).toHaveAttribute('aria-label', 'Foire aux questions');

			const listItem = within(listeDeQuestion).getAllByRole('listitem');
			expect(listItem.length).toEqual(2);
		});

		it('affiche les questions sous forme de lien', async () => {
			render(<FaqPage isFeatureActive={true} faqList={faqList}/>);

			const listeDeQuestion = screen.getByRole('list');
			const listItem = within(listeDeQuestion).getAllByRole('listitem');

			for (let index = 0; index < listItem.length; index++) {
				const lien = within(listItem[index]).getByRole('link');
				expect(lien).toHaveTextContent(faqList[index].problématique);
				expect(lien).toHaveAttribute('href', `/faq/${faqList[index].urlArticleRéponse}`);
			}
		});
	});
});

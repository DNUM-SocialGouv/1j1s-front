/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { ConsulterArticle } from '~/client/components/features/Article/ConsulterArticle';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aDateService } from '~/client/services/date/date.service.fixture';
import { aStorageService } from '~/client/services/storage/storage.service.fixture';
import { anArticle } from '~/server/articles/domain/article.fixture';

const article = anArticle({
	contenu: '## Hic devia socero Latiaeque habe foedabis genetricis\n' +
		'Lorem markdownum torumque sic latet',
});

describe('ConsulterArticle', () => {
	beforeEach(() => {
		mockUseRouter({});
	});

	it('affiche le titre de l‘article', () => {
		render(
			<DependenciesProvider
				sessionStorageService={aStorageService()}
				dateService={aDateService()}>
				<ConsulterArticle article={article} />
			</DependenciesProvider>,
		);
		const titre = screen.getByRole('heading', { level: 1, name: article.titre });
		expect(titre).toBeVisible();
	});

	it('affiche la date de dernière mise à jour', () => {
		// Given
		const article = anArticle({
			dateDerniereMiseAJour : '2023-01-26T09:22:41.783Z',
		});
		const dateMiseAJourHumanReadable = '26 janvier 2023';

		const dateService = aDateService();
		jest.spyOn(dateService, 'formatToHumanReadableDate').mockReturnValue(dateMiseAJourHumanReadable);

		// When
		render(
			<DependenciesProvider
				sessionStorageService={aStorageService()}
				dateService={dateService}>
				<ConsulterArticle article={article} />
			</DependenciesProvider>,
		);

		// Then
		const dateDerniereMiseAJour = screen.getByText('Dernière mise à jour le ' + dateMiseAJourHumanReadable);
		expect(dateDerniereMiseAJour).toBeVisible();
	});

	it('affiche le contenu de l’article', () => {
		render(
			<DependenciesProvider
				sessionStorageService={aStorageService()}
				dateService={aDateService()}>
				<ConsulterArticle article={article} />
			</DependenciesProvider>,
		);
		const contenuTitre = screen.getByRole('heading', { level: 2, name: 'Hic devia socero Latiaeque habe foedabis genetricis' });
		const contenuParagraphe = screen.getByText('Lorem markdownum torumque sic latet');
		expect(contenuTitre).toBeInTheDocument();
		expect(contenuParagraphe).toBeInTheDocument();
	});
});

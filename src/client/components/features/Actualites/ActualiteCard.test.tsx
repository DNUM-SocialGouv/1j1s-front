/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import ActualiteCard from '~/client/components/features/Actualites/ActualiteCard';
import { anActualite } from '~/server/actualites/domain/actualite.fixture';
import { anArticle } from '~/server/articles/domain/article.fixture';

describe('<ActualiteCard />', () => {
	it('affiche le titre de l’actualité', () => {
		const actualite = anActualite({
			titre: 'Il se passe des choses',
		});

		render(<ActualiteCard actualite={actualite} />);

		const titre = screen.getByText('Il se passe des choses');
		expect(titre).toBeVisible();
	});
	it('affiche l’extrait de contenu', () => {
		const actualite = anActualite({
			contenu: 'Voilà la liste des choses qui se sont passé la semaine dernière',
		});

		render(<ActualiteCard actualite={actualite} />);

		const extraitContenu = screen.getByText('Voilà la liste des choses qui se sont passé la semaine dernière');
		expect(extraitContenu).toBeVisible();
	});
	it('affiche le lien vers l’article quand présent', () => {
		const actualite = anActualite({
			article: anArticle(),
			link: '/mon-article',
		});

		render(<ActualiteCard actualite={actualite} />);

		const lienArticle = screen.getByRole('link');
		expect(lienArticle).toBeVisible();
		expect(lienArticle).toHaveAttribute('href', expect.stringContaining('/mon-article'));
		expect(lienArticle).toHaveAccessibleName('Lire l‘article');
	});
	it('affiche le lien externe quand présent', () => {
		const actualite = anActualite({
			article: undefined,
			link: 'https://www.example.com/mon-article',
		});

		render(<ActualiteCard actualite={actualite} />);

		const lienArticle = screen.getByRole('link');
		expect(lienArticle).toBeVisible();
		expect(lienArticle).toHaveAttribute('href', expect.stringContaining('https://www.example.com/mon-article'));
		expect(lienArticle).toHaveAccessibleName('En savoir plus');
	});
});

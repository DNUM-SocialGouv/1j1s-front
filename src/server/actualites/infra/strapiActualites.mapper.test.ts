import { anActualite, anActualiteList } from '~/server/actualites/domain/actualite.fixture';
import { aStrapiActualite, aStrapiListeActualites } from '~/server/actualites/infra/strapiActualites.fixture';
import { mapStrapiListeActualites } from '~/server/actualites/infra/strapiActualites.mapper';
import { anArticle } from '~/server/articles/domain/article.fixture';
import { aStrapiArticle } from '~/server/articles/infra/strapiArticle.fixture';
import { aStrapiSingleRelation } from '~/server/cms/infra/repositories/strapi.fixture';

describe('mapStrapiListeActualites', () => {
	it('renvoie la liste des actualités', () => {
		const strapiListeActualites = aStrapiListeActualites();

		const result = mapStrapiListeActualites(strapiListeActualites);

		expect(result).toStrictEqual(anActualiteList());
	});

	describe('article', () => {
		it('lorsqu‘aucun article est relié, ne renvoie pas d‘article et renvoie en link l‘url associée à l‘actualité', () => {
			const strapiListeActualites = aStrapiListeActualites({
				listeActualites: [aStrapiActualite({ article: undefined, url: 'https://www.google.com' })],
			});

			const result = mapStrapiListeActualites(strapiListeActualites);

			expect(result).toStrictEqual([anActualite({ article: undefined, link: 'https://www.google.com' })]);
		});

		it('lorsqu‘un article est relié, renvoie les informations relatives à l‘article et un lien à partir du slug de l‘article', () => {
			// GIVEN
			const strapiListeActualites = aStrapiListeActualites({
				listeActualites: [aStrapiActualite({ article: aStrapiSingleRelation(aStrapiArticle({ slug: 'this-is-a-slug' })) })],
			});

			const result = mapStrapiListeActualites(strapiListeActualites);

			expect(result).toStrictEqual([anActualite({
				article: anArticle({ slug: 'this-is-a-slug' }),
				link: '/articles/this-is-a-slug',
			})]);
		});
	});
});

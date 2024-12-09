import { aStrapiActualite, aStrapiListeActualites } from '~/server/actualites/infra/strapiActualites.fixture';
import { mapStrapiListeActualites } from '~/server/actualites/infra/strapiActualites.mapper';
import { aStrapiArticle } from '~/server/articles/infra/strapiArticle.fixture';
import { aStrapiSingleRelation } from '~/server/cms/infra/repositories/strapi.fixture';

describe('mapStrapiListeActualites', () => {
	describe('article', () => {
		it('lorsqu‘aucun article est relié, ne renvoie pas d‘article et renvoie en link l‘url associée à l‘actualité', () => {
			const strapiListeActualites = aStrapiListeActualites({
				listeActualites: [
					aStrapiActualite({ article: undefined, url: 'https://www.google.com' })],
			});

			const result = mapStrapiListeActualites(strapiListeActualites);

			expect(result[0].article).toEqual(undefined);
			expect(result[0].link).toEqual('https://www.google.com');
		});

		it('lorsqu‘un article est relié, renvoie les informations relatives à l‘article et un lien à partir du slug de l‘article', () => {
			// GIVEN
			const strapiListeActualites = aStrapiListeActualites({
				listeActualites: [aStrapiActualite({ article: aStrapiSingleRelation(aStrapiArticle({ slug: 'this-is-a-slug' })) })],
			});

			const result = mapStrapiListeActualites(strapiListeActualites);

			expect(result[0].article).toStrictEqual(expect.objectContaining({ slug: 'this-is-a-slug' }));
			expect(result[0].link).toEqual('/articles/this-is-a-slug');
		});
	});
});

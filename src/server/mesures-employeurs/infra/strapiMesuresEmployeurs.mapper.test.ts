import { anArticle } from '~/server/articles/domain/article.fixture';
import { aStrapiArticle } from '~/server/articles/infra/strapiArticle.fixture';
import { anImage } from '~/server/cms/domain/image.fixture';
import { aStrapiImage, aStrapiSingleRelation } from '~/server/cms/infra/repositories/strapi.fixture';
import {
	aMesureEmployeur,
} from '~/server/mesures-employeurs/domain/mesureEmployeur.fixture';
import {
	aStrapiMesureEmployeur,
	aStrapiMesuresEmployeursList,
} from '~/server/mesures-employeurs/infra/strapiMesuresEmployeurs.fixture';
import { mapMesuresEmployeurs } from '~/server/mesures-employeurs/infra/strapiMesuresEmployeurs.mapper';

describe('mapMesuresEmployeurs', () => {
	it('map les mesures employeurs', async () => {
		const result = mapMesuresEmployeurs(aStrapiMesuresEmployeursList({
			dispositifs: [{
				article: aStrapiSingleRelation(aStrapiArticle()),
				banniere: aStrapiSingleRelation(aStrapiImage()),
				contenu: 'Un beau contenu de carte',
				pourQui: 'Ceci est pour tous ceux à qui ça s‘adresse',
				titre: 'Un titre de carte',
				url: 'https://some.example.com/1',
			},
			{
				article: aStrapiSingleRelation(aStrapiArticle({ slug: 'slug-article' })),
				banniere: aStrapiSingleRelation(aStrapiImage()),
				contenu: 'Un deuxième beau contenu de carte',
				pourQui: 'Ceci est pour tous ceux à qui ça s‘adresse',
				titre: 'Un deuxième titre de carte',
				url: 'https://some.example.com/2',
			}],
		}));
		const expectedMesuresEmployeurs = [
			aMesureEmployeur({
				article: anArticle({
					slug: 'aide-a-l-embauche-d-un-jeune-en-parcours-emploi-competences-pec-jeunes-dans-le-secteur-non-marchand',
				}),
				banniere: anImage(),
				contenu: 'Un beau contenu de carte',
				extraitContenu: 'Un beau contenu de carte',
				link: '/articles/aide-a-l-embauche-d-un-jeune-en-parcours-emploi-competences-pec-jeunes-dans-le-secteur-non-marchand',
				pourQui: 'Ceci est pour tous ceux à qui ça s‘adresse',
				titre: 'Un titre de carte',
				url: 'https://some.example.com/1',
			}),
			aMesureEmployeur({
				article: anArticle({ slug: 'slug-article' }),
				banniere: anImage(),
				contenu: 'Un deuxième beau contenu de carte',
				extraitContenu: 'Un deuxième beau contenu de carte',
				link: '/articles/slug-article',
				pourQui: 'Ceci est pour tous ceux à qui ça s‘adresse',
				titre: 'Un deuxième titre de carte',
				url: 'https://some.example.com/2',
			}),
		];

		expect(result).toEqual(expectedMesuresEmployeurs);
	});

	describe('article', () => {
		it('lorsqu‘aucun article est relié, ne renvoie pas d‘article et renvoie en link l‘url associée à la mesure employeur', () => {
			// GIVEN
			const strapiMesuresEmployeurs = aStrapiMesuresEmployeursList({
				dispositifs: [aStrapiMesureEmployeur({
					article: undefined,
					url: 'https://some.example.com/4',
				})],
			});

			// WHEN
			const result = mapMesuresEmployeurs(strapiMesuresEmployeurs);

			// THEN
			expect(result).toStrictEqual([aMesureEmployeur({
				article: undefined,
				link: 'https://some.example.com/4',
				url: 'https://some.example.com/4',
			})]);
		});

		it('lorsqu‘un article est relié, renvoie les informations relatives à l‘article et un lien à partir du slug de l‘article', () => {
			// GIVEN
			const strapiMesuresEmployeurs = aStrapiMesuresEmployeursList({
				dispositifs: [aStrapiMesureEmployeur({
					article: aStrapiSingleRelation(aStrapiArticle({ slug: 'this-is-a-slug' })),
				})],
			});

			// WHEN
			const result = mapMesuresEmployeurs(strapiMesuresEmployeurs);

			// THEN
			expect(result).toStrictEqual([aMesureEmployeur({
				article: anArticle({ slug: 'this-is-a-slug' }),
				link: '/articles/this-is-a-slug',
			})]);
		});
	});


	it('lorsque je ne fourni pas d‘alternative texte à la bannière, renvoie une string vide', () => {
		const strapiMesuresEmployeurs = aStrapiMesuresEmployeursList({
			dispositifs: [aStrapiMesureEmployeur({
				banniere: aStrapiSingleRelation(aStrapiImage({
					alternativeText: undefined,
				})),
			})],
		});

		const result = mapMesuresEmployeurs(strapiMesuresEmployeurs);

		expect(result).toStrictEqual([aMesureEmployeur({
			banniere: anImage({
				alt: '',
			}),
		})]);
	});
});

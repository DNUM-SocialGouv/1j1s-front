import { aStrapiArticle } from '~/server/articles/infra/strapiArticle.fixture';
import { anImage } from '~/server/cms/domain/image.fixture';
import { aStrapiImage, aStrapiSingleRelation } from '~/server/cms/infra/repositories/strapi.fixture';
import { aMesureEmployeur } from '~/server/mesures-employeurs/domain/mesureEmployeur.fixture';
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
				banniere: anImage(),
				link: '/articles/aide-a-l-embauche-d-un-jeune-en-parcours-emploi-competences-pec-jeunes-dans-le-secteur-non-marchand',
				pourQui: 'Ceci est pour tous ceux à qui ça s‘adresse',
				titre: 'Un titre de carte',
			}),
			aMesureEmployeur({
				banniere: anImage(),
				link: '/articles/slug-article',
				pourQui: 'Ceci est pour tous ceux à qui ça s‘adresse',
				titre: 'Un deuxième titre de carte',
			}),
		];

		expect(result).toEqual(expectedMesuresEmployeurs);
	});

	describe('article', () => {
		it('lorsqu‘aucun article est relié, renvoie en link l‘url associée à la mesure employeur', () => {
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
				link: 'https://some.example.com/4',
			})]);
		});

		it('lorsqu‘un article est relié, renvoie un lien à partir du slug de l‘article', () => {
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

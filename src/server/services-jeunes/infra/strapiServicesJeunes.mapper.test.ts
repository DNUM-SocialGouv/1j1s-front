import { aStrapiArticle } from '~/server/articles/infra/strapiArticle.fixture';
import { anImage } from '~/server/cms/domain/image.fixture';
import { aStrapiImage, aStrapiSingleRelation } from '~/server/cms/infra/repositories/strapi.fixture';
import {
	anUnorderedAndNotFilterServiceJeuneList,
	aServiceJeune,
} from '~/server/services-jeunes/domain/servicesJeunes.fixture';
import {
	aStrapiMesureJeune,
	aStrapiMesuresJeunesParCategorie,
	aStrapiMesuresJeunesParCategorieSansResultat,
} from '~/server/services-jeunes/infra/strapiMesuresJeunes.fixture';
import { mapToServicesJeunes } from '~/server/services-jeunes/infra/strapiServicesJeunes.mapper';

describe('mapToServicesJeunes', () => {
	it('renvoie la liste des services jeunes', () => {
		// GIVEN
		const strapiMesuresJeunesParCategorie = aStrapiMesuresJeunesParCategorie({
			accompagnement: [aStrapiMesureJeune({
				article: aStrapiSingleRelation(aStrapiArticle()),
				banniere: aStrapiSingleRelation(aStrapiImage()),
				contenu: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
				pourQui: 'pour les 12 à 18mois',
				titre: 'Une formation en centre EPIDE',
			})],
			aidesFinancieres: [aStrapiMesureJeune({
				titre: 'Des aides pour financer son permis de conduire',
			})],
			orienterFormer: [aStrapiMesureJeune({
				titre: 'Les Junior Entreprises',
			})],
			vieProfessionnelle: [aStrapiMesureJeune({
				titre: 'Le Parcours Emploi Compétences (PEC) Jeunes',
			})],

		});

		// WHEN
		const result = mapToServicesJeunes(strapiMesuresJeunesParCategorie);

		// THEN
		expect(result).toStrictEqual(anUnorderedAndNotFilterServiceJeuneList());
	});

	describe('article', () => {
		it('lorsqu‘aucun article est relié, ne renvoie pas d‘article et renvoie en link l‘url associée à la mesure jeune', () => {
			// GIVEN
			const strapiMesuresJeunesParCategorie = aStrapiMesuresJeunesParCategorieSansResultat({
				accompagnement: [aStrapiMesureJeune({
					article: undefined,
				})],
			});

			// WHEN
			const result = mapToServicesJeunes(strapiMesuresJeunesParCategorie);

			// THEN
			expect(result).toStrictEqual([aServiceJeune({
				link: 'Une belle url de carte',
			})]);
		});
		it('lorsqu‘un article est relié, renvoie les informations relatives à l‘article et un lien à partir du slug de l‘article', () => {
			// GIVEN
			const strapiMesuresJeunesParCategorie = aStrapiMesuresJeunesParCategorieSansResultat({
				accompagnement: [aStrapiMesureJeune({
					article: aStrapiSingleRelation(aStrapiArticle({ slug: 'this-is-a-slug' })),
				})],
			});

			// WHEN
			const result = mapToServicesJeunes(strapiMesuresJeunesParCategorie);

			// THEN
			expect(result).toStrictEqual([aServiceJeune({
				link: '/articles/this-is-a-slug',
			})]);
		});
	});

	it('lorsque je ne fourni pas d‘alternative texte à la bannière, renvoie une string vide', () => {
		const strapiMesuresJeunesParCategorie = aStrapiMesuresJeunesParCategorieSansResultat({
			accompagnement: [aStrapiMesureJeune({
				banniere: aStrapiSingleRelation(aStrapiImage({
					alternativeText: undefined,
				})),
			})],
		});

		const result = mapToServicesJeunes(strapiMesuresJeunesParCategorie);

		expect(result).toStrictEqual([aServiceJeune({
			banniere: anImage({
				alt: '',
			}),
		})]);
	});
});

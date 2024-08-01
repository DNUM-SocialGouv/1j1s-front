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
import {
	filterStrapiMesuresJeunes,
	mapToServicesJeunes,
} from '~/server/services-jeunes/infra/strapiServicesJeunes.service';
import {
	aStrapiMesureEmployeur,
	aStrapiMesuresEmployeursList,
} from '~/server/mesures-employeurs/infra/strapiMesuresEmployeurs.fixture';

describe('mapToServicesJeunes', () => {
	it('renvoie la liste des services jeunes', () => {
		// GIVEN
		const strapiMesuresJeunesParCategorie = aStrapiMesuresJeunesParCategorie({
			accompagnement: [aStrapiMesureJeune({
				article: aStrapiSingleRelation(aStrapiArticle()),
				banniere: aStrapiSingleRelation(aStrapiImage()),
				pourQui: 'pour les 12 à 18mois',
				titre: 'Une formation en centre EPIDE',
			})],
			aidesFinancieres: [aStrapiMesureJeune({
				titre: 'Des aides pour financer son permis de conduire',
			})],
			engagement: [aStrapiMesureJeune({
				titre: 'Le Service Militaire Volontaire',
			})],
			logement: [aStrapiMesureJeune({
				titre: 'Un Logement',
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

describe('filterStrapiMesuresJeunes', () => {
	it('ne renvoie pas les mesures jeunes sans link', async () => {
		// Given
		const mesureJeuneSansLink = aStrapiMesureJeune({
			titre: 'mesure-sans-link',
			article: undefined,
			url: undefined,
		});
		const mesureJeuneAvecLink = aStrapiMesureJeune({
			titre: 'mesure-avec-link',
		});
		const mesureJeuneList = aStrapiMesuresJeunesParCategorie({
			accompagnement: [
				mesureJeuneSansLink,
				mesureJeuneAvecLink,
			],
		});

		// When
		const result = filterStrapiMesuresJeunes(mesureJeuneList);

		// Then
		const resultExpected = aStrapiMesuresJeunesParCategorie({
			accompagnement: [ mesureJeuneAvecLink ],
		});
		expect(result).toStrictEqual(resultExpected);
	});
});

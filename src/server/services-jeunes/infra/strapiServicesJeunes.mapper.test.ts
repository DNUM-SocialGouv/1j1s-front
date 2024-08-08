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

	describe('link', () => {
		describe('article non relié, url non relié', () => {
			it('laisse link undefined', () => {
				// Given
				const strapiMesuresJeunesParCategorie = aStrapiMesuresJeunesParCategorieSansResultat({
					accompagnement: [aStrapiMesureJeune({
						article: undefined,
						url: undefined,
					})],
				});

				// When
				const result = mapToServicesJeunes(strapiMesuresJeunesParCategorie);

				// Then
				const mesureObtenue = result[0];
				expect(mesureObtenue.link).toBeUndefined();
			});
		});

		describe('article non relié, url relié', () => {
			it('ne renvoie pas d‘article et renvoie en link l’url associée à la mesure jeune', () => {
				// Given
				const urlRelieAttendu = 'mon-url-relié';
				const strapiMesuresJeunesParCategorie = aStrapiMesuresJeunesParCategorieSansResultat({
					accompagnement: [aStrapiMesureJeune({
						article: undefined,
						url: urlRelieAttendu,
					})],
				});

				// When
				const result = mapToServicesJeunes(strapiMesuresJeunesParCategorie);

				// Then
				const mesureObtenue = result[0];
				expect(mesureObtenue.link).toStrictEqual(urlRelieAttendu);
			});
		});
	});

	describe('article relié', () => {
		it('renvoie les informations relatives à l’article et un lien à partir du slug de l’article', () => {
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

	it('lorsque je ne fournis pas d‘alternative texte à la bannière, renvoie une string vide', () => {
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

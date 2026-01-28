import { StrapiArticle } from '~/server/articles/infra/strapiArticle';
import { StrapiImage } from '~/server/cms/infra/repositories/strapi.response';
import { flatMapSingleRelation } from '~/server/cms/infra/repositories/strapi.utils';
import {
	mapCodeCategorieServiceJeuneToLibelle,
	ServiceJeune,
	ServiceJeuneCategorie,
	ServiceJeuneCodeCategorie,
} from '~/server/services-jeunes/domain/servicesJeunes';
import {
	StrapiMesuresJeunesCategorie,
	StrapiMesuresJeunesMesureJeune,
	StrapiMesuresJeunesMesuresJeunesParCategorie,
} from '~/server/services-jeunes/infra/strapiMesuresJeunes';

export function mapToServicesJeunes(strapiMesuresJeunes: StrapiMesuresJeunesMesuresJeunesParCategorie): Array<ServiceJeune> {
	const mesuresJeunesParCategorie = {
		accompagnement: strapiMesuresJeunes.accompagnement,
		aidesFinancieres: strapiMesuresJeunes.aidesFinancieres,
		engagement: strapiMesuresJeunes.engagement,
		logement: strapiMesuresJeunes.logement,
		orienterFormer: strapiMesuresJeunes.orienterFormer,
		vieProfessionnelle: strapiMesuresJeunes.vieProfessionnelle,
	};
	return Object.entries(mesuresJeunesParCategorie).flatMap(([categorie, mesuresJeunes]) => {
		return mesuresJeunes.map((strapiMesureJeune: StrapiMesuresJeunesMesureJeune) => {
			return mapServiceJeune(strapiMesureJeune, categorie as StrapiMesuresJeunesCategorie);
		});
	});
}

function mapServiceJeune(strapiMesureJeune: StrapiMesuresJeunesMesureJeune, categorie: StrapiMesuresJeunesCategorie): ServiceJeune {
	const banniere = flatMapSingleRelation<StrapiImage>(strapiMesureJeune.banniere);

	return {
		banniere: banniere && {
			alt: banniere.alternativeText || '',
			src: banniere.url,
		},
		categorie: mapServiceJeuneCategorie(categorie),
		concerne: strapiMesureJeune.pourQui,
		link: mapServiceJeuneLink(strapiMesureJeune),
		titre: strapiMesureJeune.titre,
	};
}

function mapServiceJeuneCategorie(mesureJeuneKey: keyof StrapiMesuresJeunesMesuresJeunesParCategorie): ServiceJeuneCategorie {
	switch (mesureJeuneKey) {
		case 'accompagnement':
			return {
				code: ServiceJeuneCodeCategorie.ACCOMPAGNEMENT,
				libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeuneCodeCategorie.ACCOMPAGNEMENT),
			};
		case 'orienterFormer':
			return {
				code: ServiceJeuneCodeCategorie.ORIENTATION_FORMATION,
				libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeuneCodeCategorie.ORIENTATION_FORMATION),
			};
		case 'vieProfessionnelle':
			return {
				code: ServiceJeuneCodeCategorie.ENTREE_VIE_PROFESSIONELLE,
				libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeuneCodeCategorie.ENTREE_VIE_PROFESSIONELLE),
			};
		case 'aidesFinancieres':
			return {
				code: ServiceJeuneCodeCategorie.AIDES_FINANCIERES,
				libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeuneCodeCategorie.AIDES_FINANCIERES),
			};
		case 'engagement':
			return {
				code: ServiceJeuneCodeCategorie.ENGAGEMENT,
				libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeuneCodeCategorie.ENGAGEMENT),
			};
		case 'logement':
			return {
				code: ServiceJeuneCodeCategorie.LOGEMENT,
				libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeuneCodeCategorie.LOGEMENT),
			};
	}
}

function mapServiceJeuneLink(mesure: StrapiMesuresJeunesMesureJeune) {
	const article = mesure.article && flatMapSingleRelation<StrapiArticle>(mesure.article);
	if(!article && !mesure.url) {
		return undefined;
	}
	return article ? `/articles/${article.slug}` : mesure.url;
}

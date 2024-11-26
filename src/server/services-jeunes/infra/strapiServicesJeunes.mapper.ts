import { StrapiArticle } from '~/server/articles/infra/strapiArticle';
import { Strapi } from '~/server/cms/infra/repositories/strapi.response';
import { flatMapSingleRelation } from '~/server/cms/infra/repositories/strapi.utils';
import { mapCodeCategorieServiceJeuneToLibelle, ServiceJeune } from '~/server/services-jeunes/domain/servicesJeunes';
import { StrapiMesuresJeunes } from '~/server/services-jeunes/infra/strapiMesuresJeunes';

export function mapToServicesJeunes(strapiMesuresJeunes: StrapiMesuresJeunes.MesuresJeunesParCategorie): Array<ServiceJeune> {
	const mesuresJeunesParCategorie = {
		accompagnement: strapiMesuresJeunes.accompagnement,
		aidesFinancieres: strapiMesuresJeunes.aidesFinancieres,
		engagement: strapiMesuresJeunes.engagement,
		logement: strapiMesuresJeunes.logement,
		orienterFormer: strapiMesuresJeunes.orienterFormer,
		vieProfessionnelle: strapiMesuresJeunes.vieProfessionnelle,
	};
	return Object.entries(mesuresJeunesParCategorie).flatMap(([categorie, mesuresJeunes]) => {
		return mesuresJeunes.map((strapiMesureJeune: StrapiMesuresJeunes.MesureJeune) => {
			return mapServiceJeune(strapiMesureJeune, categorie as StrapiMesuresJeunes.Categorie);
		});
	});
}

function mapServiceJeune(strapiMesureJeune: StrapiMesuresJeunes.MesureJeune, categorie: StrapiMesuresJeunes.Categorie): ServiceJeune {
	const banniere = flatMapSingleRelation<Strapi.Image>(strapiMesureJeune.banniere);

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

function mapServiceJeuneCategorie(mesureJeuneKey: keyof StrapiMesuresJeunes.MesuresJeunesParCategorie): ServiceJeune.Categorie {
	switch (mesureJeuneKey) {
		case 'accompagnement':
			return {
				code: ServiceJeune.CodeCategorie.ACCOMPAGNEMENT,
				libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ACCOMPAGNEMENT),
			};
		case 'orienterFormer':
			return {
				code: ServiceJeune.CodeCategorie.ORIENTATION_FORMATION,
				libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ORIENTATION_FORMATION),
			};
		case 'vieProfessionnelle':
			return {
				code: ServiceJeune.CodeCategorie.ENTREE_VIE_PROFESSIONELLE,
				libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ENTREE_VIE_PROFESSIONELLE),
			};
		case 'aidesFinancieres':
			return {
				code: ServiceJeune.CodeCategorie.AIDES_FINANCIERES,
				libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.AIDES_FINANCIERES),
			};
		case 'engagement':
			return {
				code: ServiceJeune.CodeCategorie.ENGAGEMENT,
				libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ENGAGEMENT),
			};
		case 'logement':
			return {
				code: ServiceJeune.CodeCategorie.LOGEMENT,
				libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.LOGEMENT),
			};
	}
}

function mapServiceJeuneLink(mesure: StrapiMesuresJeunes.MesureJeune) {
	const article = mesure.article && flatMapSingleRelation<StrapiArticle>(mesure.article);
	if(!article && !mesure.url) {
		return undefined;
	}
	return article ? `/articles/${article.slug}` : mesure.url;
}

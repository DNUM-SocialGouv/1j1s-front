import { StrapiArticle } from '~/server/articles/infra/strapiArticle';
import { Strapi } from '~/server/cms/infra/repositories/strapi.response';
import { flatMapSingleRelation } from '~/server/cms/infra/repositories/strapi.utils';
import { ServiceJeune } from '~/server/services-jeunes/domain/servicesJeunes';
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
			return ServiceJeune.Categorie.ACCOMPAGNEMENT;
		case 'orienterFormer':
			return ServiceJeune.Categorie.ORIENTATION_FORMATION;
		case 'vieProfessionnelle':
			return ServiceJeune.Categorie.ENTREE_VIE_PROFESSIONELLE;
		case 'aidesFinancieres':
			return ServiceJeune.Categorie.AIDES_FINANCIERES;
		case 'engagement':
			return ServiceJeune.Categorie.ENGAGEMENT;
		case 'logement':
			return ServiceJeune.Categorie.LOGEMENT;
	}
}

function mapServiceJeuneLink(mesure: StrapiMesuresJeunes.MesureJeune) {
	const article = mesure.article && flatMapSingleRelation<StrapiArticle>(mesure.article);
	if(!article && !mesure.url) {
		return undefined;
	}
	return article ? `/articles/${article.slug}` : mesure.url;
}

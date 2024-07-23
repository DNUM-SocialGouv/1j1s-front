import { StrapiArticle } from '~/server/articles/infra/strapiArticle';
import { Strapi } from '~/server/cms/infra/repositories/strapi.response';
import { flatMapSingleRelation } from '~/server/cms/infra/repositories/strapi.utils';
import { ServiceJeune } from '~/server/services-jeunes/domain/servicesJeunes';
import { StrapiMesuresJeunes } from '~/server/services-jeunes/infra/strapiMesuresJeunes';

export function mapToServicesJeunes(strapiMesuresJeunes: StrapiMesuresJeunes.MesuresJeunesParCategorie): Array<ServiceJeune> {
	const mesuresJeunesParCategorie = {
		accompagnement: strapiMesuresJeunes.accompagnement,
		aidesFinancieres: strapiMesuresJeunes.aidesFinancieres,
		orienterFormer: strapiMesuresJeunes.orienterFormer,
		vieProfessionnelle: strapiMesuresJeunes.vieProfessionnelle,
		engagement: strapiMesuresJeunes.engagement,
		logement: strapiMesuresJeunes.logement,
	};
	return Object.entries(mesuresJeunesParCategorie).flatMap(([categorie, mesuresJeunes]) => {
		return mesuresJeunes.map((strapiMesureJeune: StrapiMesuresJeunes.MesureJeune) => {
			return mapServiceJeune(strapiMesureJeune, categorie as StrapiMesuresJeunes.Categorie);
		});
	});
}

function mapServiceJeune(response: StrapiMesuresJeunes.MesureJeune, categorie: StrapiMesuresJeunes.Categorie): ServiceJeune {
	const article = response.article && flatMapSingleRelation<StrapiArticle>(response.article);
	const banniere = flatMapSingleRelation<Strapi.Image>(response.banniere);

	return {
		banniere: banniere && {
			alt: banniere.alternativeText || '',
			src: banniere.url,
		},
		categorie: mapServiceJeuneCategorie(categorie),
		concerne: response.pourQui,
		link: article ? `/articles/${article.slug}` : response.url,
		titre: response.titre,
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

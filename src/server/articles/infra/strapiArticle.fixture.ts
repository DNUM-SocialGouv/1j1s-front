import { StrapiArticle } from '~/server/articles/infra/strapiArticle';
import { aStrapiImage, aStrapiSingleRelation } from '~/server/cms/infra/repositories/strapi.fixture';

export function aStrapiArticle(overrides?: Partial<StrapiArticle>): StrapiArticle {
	return {
		banniere: aStrapiSingleRelation(aStrapiImage()),
		contenu: 'Avec le Parcours Emploi Compétences (PEC), vous permettez à des personnes éloignées de l’emploi de s’insérer professionnellement et vous bénéficiez d’une aide de l’État.',
		slug: 'aide-a-l-embauche-d-un-jeune-en-parcours-emploi-competences-pec-jeunes-dans-le-secteur-non-marchand',
		titre: 'Aide à l’embauche d’un jeune en Parcours Emploi Compétences (PEC Jeunes) dans le secteur non marchand',
		updatedAt: '2023-01-26T09:22:41.775Z',
		...overrides,
	};
}

export function aStrapiArticleSlug(override?: Partial<Pick<StrapiArticle, 'slug'>>): Pick<StrapiArticle, 'slug'>{
	return {
		slug: 'l-aide-exceptionnelle-pour-l-apprentissage-l-atout-qu-il-faut-pour-vos-candidatures',
		...override,
	};
}


export function aStrapiArticleSlugList(): Array<Pick<StrapiArticle, 'slug'>> {
	return [
		aStrapiArticleSlug(),
		aStrapiArticleSlug({ slug: 'pec-jeunes-pour-developper-des-competences-transferables' }),
		aStrapiArticleSlug({ slug: 'faire-un-service-civique' }),
		aStrapiArticleSlug({ slug: 'aide-a-l-embauche-d-un-jeune-en-parcours-emploi-competences-pec-jeunes-dans-le-secteur-non-marchand' }),
	];
}

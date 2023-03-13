import { FoireAuxQuestions } from '~/server/cms/domain/foireAuxQuestions.type';
import { Strapi } from '~/server/cms/infra/repositories/strapi.response';

const unArticleReliéAUneProblématique = (problématique: string): Strapi.SingleRelation<Strapi.CollectionType.Article> => {
	return {
		data: {
			attributes: {
				banniere: undefined,
				contenu: 'contenu explicatif',
				slug: problématique.replace(' ', '-'),
				titre: problématique,
			},
			id: 85,
		},
	};
};

export const uneFaqListResponse = (): Array<Strapi.CollectionType.FoireAuxQuestions> => {
	return[
		uneFAQResponse(),
		uneFAQResponse({
			problematique: 'Je n’arrive pas à candidater à une offre d’emploi',
			reponse: unArticleReliéAUneProblématique('Je n’arrive pas à candidater à une offre d’emploi'),
		}),
	];
};

export const uneFaqListSansRelationResponse = (): Array<Strapi.CollectionType.FoireAuxQuestions> => {
	return[
		uneFAQResponse(),
		uneFAQResponse({
			problematique: 'Je n’arrive pas à candidater à une offre d’emploi',
			reponse: unArticleReliéAUneProblématique('Je n’arrive pas à candidater à une offre d’emploi'),
		}),
		uneFAQResponse({
			problematique: 'Je ne suis pas lié à un article',
			reponse: { data:  null  },
		}),
	];
};

export const uneFAQResponse = (override?: Partial<Strapi.CollectionType.FoireAuxQuestions>): Strapi.CollectionType.FoireAuxQuestions => {
	return {
		problematique: 'Comment constituer un dossier locatif ?',
		reponse: unArticleReliéAUneProblématique('Comment constituer un dossier locatif ?'),
		...override,
	};
};


export const uneFaqList = (): Array<FoireAuxQuestions> => {
	return [
		uneQuestion('Comment constituer un dossier locatif ?'),
		uneQuestion('Je n’arrive pas à candidater à une offre d’emploi'),
	];
};

const uneQuestion = (problématique: string): FoireAuxQuestions => {
	return {
		problématique,
		urlArticleRéponse: problématique.replace(' ', '-'),
	};
};

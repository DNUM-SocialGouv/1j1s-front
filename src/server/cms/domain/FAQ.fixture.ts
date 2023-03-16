import { Question } from '~/server/cms/domain/FAQ.type';
import { Strapi } from '~/server/cms/infra/repositories/strapi.response';

export const uneListeDeQuestionStrapiResponse = (): Array<Strapi.CollectionType.FAQ> => {
	return [
		uneQuestionStrapiResponse(),
		uneQuestionStrapiResponse({
			problematique: 'Je n’arrive pas à candidater à une offre d’emploi',
			slug: 'Je n’arrive pas à candidater à une offre d’emploi'.replace(' ', '-'),
		}),
	];
};



export const uneQuestionStrapiResponse = (override?: Partial<Strapi.CollectionType.FAQ>): Strapi.CollectionType.FAQ.Réponse => {
	return {
		contenu: 'mon contenu explicatif',
		problematique: 'Comment constituer un dossier locatif ?',
		slug: 'Comment constituer un dossier locatif ?'.replace(' ', '-'),
		...override,
	};
};

export const uneListeDeQuestion = (): Array<Question> => {
	return [
		uneQuestion('Comment constituer un dossier locatif ?'),
		uneQuestion('Je n’arrive pas à candidater à une offre d’emploi'),
	];
};

const uneQuestion = (problématique: string): Question => {
	return {
		problématique,
		slug: problématique.replace(' ', '-'),
	};
};

export const uneQuestionRéponse = (problématique: string): Question.QuestionRéponse => {
	return {
		contenu: 'mon contenu explicatif',
		problématique,
		slug: problématique.replace(' ', '-'),
	};
};

import { FAQResponse, Question } from '~/server/faq/domain/FAQ';

export const aStrapiListeDeQuestion = (): Array<FAQResponse.FAQ> => {
	return [
		aStrapiQuestion(),
		aStrapiQuestion({
			problematique: 'Je n’arrive pas à candidater à une offre d’emploi',
			slug: 'Je n’arrive pas à candidater à une offre d’emploi'.replace(' ', '-'),
		}),
	];
};



export const aStrapiQuestion = (override?: Partial<FAQResponse.Réponse>): FAQResponse.Réponse => {
	return {
		contenu: 'mon contenu explicatif',
		problematique: 'Comment constituer un dossier locatif ?',
		slug: 'Comment constituer un dossier locatif ?'.replace(' ', '-'),
		...override,
	};
};

export const aListeDeQuestion = (): Array<Question> => {
	return [
		aQuestion({ problématique: 'Comment constituer un dossier locatif ?' }),
		aQuestion({ problématique:'Je n’arrive pas à candidater à une offre d’emploi' }),
	];
};

export const aQuestion = (override?: Partial<Question>): Question => {
	return {
		problématique: 'Comment constituer un dossier locatif ?',
		slug: 'question-slug',
		...override,
	};
};

export const aQuestionRéponse = (override?: Partial<Question.QuestionRéponse>): Question.QuestionRéponse => {
	return {
		contenu: 'mon contenu explicatif',
		problématique: 'Comment constituer un dossier locatif ?',
		slug: 'question-slug',
		...override,
	};
};

export function aListeFAQSlug(): Array<string> {
	return [
		'comment-constituer-un-dossier-locatif-jeune',
		'comment-faire-son-service-civique',
		'que-faire-site-la-recherche-d-emploi-ne-fonctionne-pas',
	];
}

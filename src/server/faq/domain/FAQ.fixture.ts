import { FAQ } from '~/server/faq/domain/FAQ';

export const aListeDeQuestion = (): Array<FAQ.Question> => {
	return [
		aQuestion({ problématique: 'Comment constituer un dossier locatif ?' }),
		aQuestion({ problématique:'Je n’arrive pas à candidater à une offre d’emploi' }),
	];
};

export const aQuestion = (override?: Partial<FAQ.Question>): FAQ.Question => {
	return {
		problématique: 'Comment constituer un dossier locatif ?',
		slug: 'Comment-constituer-un-dossier-locatif ?',
		...override,
	};
};

export const aQuestionEtReponse = (override?: Partial<FAQ.QuestionEtReponse>): FAQ.QuestionEtReponse => {
	return {
		contenu: 'mon contenu explicatif',
		problématique: 'Comment constituer un dossier locatif ?',
		slug: 'Comment-constituer-un-dossier-locatif ?',
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

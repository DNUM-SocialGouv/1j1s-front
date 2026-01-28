import { FAQQuestion, FAQQuestionEtReponse } from '~/server/faq/domain/FAQ';

export const aListeDeQuestion = (): Array<FAQQuestion> => {
	return [
		aQuestion({ problématique: 'Comment constituer un dossier locatif ?' }),
		aQuestion({ problématique:'Je n’arrive pas à candidater à une offre d’emploi' }),
	];
};

export const aQuestion = (override?: Partial<FAQQuestion>): FAQQuestion => {
	return {
		problématique: 'Comment constituer un dossier locatif ?',
		slug: 'Comment-constituer-un-dossier-locatif ?',
		...override,
	};
};

export const aQuestionEtReponse = (override?: Partial<FAQQuestionEtReponse>): FAQQuestionEtReponse => {
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

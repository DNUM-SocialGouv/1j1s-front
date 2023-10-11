import { FAQResponseStrapi } from '~/server/faq/infra/strapiFAQ';

export const aStrapiQuestionEtReponse = (override?: Partial<FAQResponseStrapi.QuestionEtReponse>): FAQResponseStrapi.QuestionEtReponse => {
	return {
		contenu: 'mon contenu explicatif',
		problematique: 'Comment constituer un dossier locatif ?',
		slug: 'Comment-constituer-un-dossier-locatif ?',
		...override,
	};
};
export const aStrapiQuestion = (override?: Partial<FAQResponseStrapi.Question>): FAQResponseStrapi.Question => {
	return {
		problematique: 'Comment constituer un dossier locatif ?',
		slug: 'Comment-constituer-un-dossier-locatif ?',
		...override,
	};
};
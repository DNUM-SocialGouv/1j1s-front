import {
	FAQResponseStrapiQuestion,
	FAQResponseStrapiQuestionEtReponse,
	FAQResponseStrapiQuestionSlug,
} from '~/server/faq/infra/strapiFAQ';

export const aStrapiQuestionEtReponse = (override?: Partial<FAQResponseStrapiQuestionEtReponse>): FAQResponseStrapiQuestionEtReponse => {
	return {
		contenu: 'mon contenu explicatif',
		problematique: 'Comment constituer un dossier locatif ?',
		slug: 'Comment-constituer-un-dossier-locatif ?',
		...override,
	};
};
export const aStrapiQuestion = (override?: Partial<FAQResponseStrapiQuestion>): FAQResponseStrapiQuestion => {
	return {
		problematique: 'Comment constituer un dossier locatif ?',
		slug: 'Comment-constituer-un-dossier-locatif ?',
		...override,
	};
};

export const aStrapiQuestionSlug = (override?: Partial<FAQResponseStrapiQuestionSlug>): FAQResponseStrapiQuestionSlug => {
	return {
		slug: 'Comment-constituer-un-dossier-locatif ?',
		...override,
	};
};

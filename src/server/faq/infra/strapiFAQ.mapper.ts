import { FAQQuestion, FAQQuestionEtReponse } from '~/server/faq/domain/FAQ';
import { FAQResponseStrapiQuestion, FAQResponseStrapiQuestionEtReponse } from '~/server/faq/infra/strapiFAQ';

export const mapQuestionReponse = (faq: FAQResponseStrapiQuestionEtReponse): FAQQuestionEtReponse => {
	return {
		contenu: faq.contenu,
		problématique: faq.problematique,
		slug: faq.slug,
	};
};

export const mapQuestion = (faq: FAQResponseStrapiQuestion): FAQQuestion => {
	return {
		problématique: faq.problematique,
		slug: faq.slug,
	};
};

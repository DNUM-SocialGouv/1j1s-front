import { FAQ } from '~/server/faq/domain/FAQ';
import { FAQResponseStrapi } from '~/server/faq/infra/strapiFAQ';

export const mapQuestionRéponse = (faq: FAQResponseStrapi.QuestionEtReponse): FAQ.QuestionEtReponse => {
	return {
		contenu: faq.contenu,
		problématique: faq.problematique,
		slug: faq.slug,
	};
};

export const mapQuestion = (faq: FAQResponseStrapi.Question): FAQ.Question => {
	return {
		problématique: faq.problematique,
		slug: faq.slug,
	};
};

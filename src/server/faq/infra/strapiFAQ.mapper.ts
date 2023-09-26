import { FAQ,FAQResponseStrapi } from '~/server/faq/domain/FAQ';

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

export const flatMapSlug = (faq: FAQResponseStrapi.QuestionSlug): FAQ.Slug => faq.slug;


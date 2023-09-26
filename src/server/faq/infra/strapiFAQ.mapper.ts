import { FAQResponse, Question } from '~/server/faq/domain/FAQ';

export const mapQuestionRéponse = (faq: FAQResponse.Réponse): Question.QuestionRéponse => {
	return {
		contenu: faq.contenu,
		problématique: faq.problematique,
		slug: faq.slug,
	};
};

export const mapQuestion = (faq: FAQResponse.FAQ): Question => {
	return {
		problématique: faq.problematique,
		slug: faq.slug,
	};
};

export const flatMapSlug = (faq: FAQResponse.FAQ): string => faq.slug;


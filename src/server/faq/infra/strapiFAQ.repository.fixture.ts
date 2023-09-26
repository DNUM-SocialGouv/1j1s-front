import { createSuccess } from '~/server/errors/either';

import { aListeDeQuestion, aListeFAQSlug, aQuestionRéponse } from '../domain/FAQ.fixture';
import { FAQRepository } from '../domain/FAQ.repository';

export function aFAQRepository(override?:Partial<FAQRepository>): FAQRepository {
	return {
		getAllFAQ: jest.fn().mockResolvedValue(createSuccess(aListeDeQuestion())),
		getFAQBySlug: jest.fn().mockResolvedValue(createSuccess(aQuestionRéponse())),
		listAllFAQSlug: jest.fn().mockResolvedValue(createSuccess(aListeFAQSlug())),
		...override,
	};
}

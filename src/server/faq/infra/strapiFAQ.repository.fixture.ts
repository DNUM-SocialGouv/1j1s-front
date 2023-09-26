import { createSuccess } from '~/server/errors/either';

import { aListeDeQuestion, aListeFAQSlug, aQuestionEtReponse } from '../domain/FAQ.fixture';
import { FAQRepository } from '../domain/FAQ.repository';

export function aFAQRepository(override?:Partial<FAQRepository>): FAQRepository {
	return {
		getAllFAQ: jest.fn().mockResolvedValue(createSuccess(aListeDeQuestion())),
		getFAQBySlug: jest.fn().mockResolvedValue(createSuccess(aQuestionEtReponse())),
		listAllFAQSlug: jest.fn().mockResolvedValue(createSuccess(aListeFAQSlug())),
		...override,
	};
}

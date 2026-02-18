import { createSuccess } from '~/server/errors/either';
import { aListeDeQuestion, aListeFAQSlug, aQuestionEtReponse } from '~/server/faq/domain/FAQ.fixture';
import { FAQRepository } from '~/server/faq/domain/FAQ.repository';

export function aFAQRepository(override?:Partial<FAQRepository>): FAQRepository {
	return {
		getAllFAQ: vi.fn().mockResolvedValue(createSuccess(aListeDeQuestion())),
		getFAQBySlug: vi.fn().mockResolvedValue(createSuccess(aQuestionEtReponse())),
		listAllFAQSlug: vi.fn().mockResolvedValue(createSuccess(aListeFAQSlug())),
		...override,
	};
}

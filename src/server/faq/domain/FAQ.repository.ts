import { Either } from '~/server/errors/either';

import { FAQQuestion, FAQQuestionEtReponse, FAQSlug } from './FAQ';

export interface FAQRepository {
	getFAQBySlug(slug: FAQSlug): Promise<Either<FAQQuestionEtReponse>>
	getAllFAQ(): Promise<Either<Array<FAQQuestion>>>
	listAllFAQSlug(): Promise<Either<Array<FAQSlug>>>
}

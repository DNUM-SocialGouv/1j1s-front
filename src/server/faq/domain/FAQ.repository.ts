import { Either } from '~/server/errors/either';

import { FAQ } from './FAQ';

export interface FAQRepository {
	getFAQBySlug(slug: FAQ.Slug): Promise<Either<FAQ.QuestionEtReponse>>
	getAllFAQ(): Promise<Either<Array<FAQ.Question>>>
	listAllFAQSlug(): Promise<Either<Array<FAQ.Slug>>>
}

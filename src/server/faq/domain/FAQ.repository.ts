import { Either } from '~/server/errors/either';

import { Question, QuestionSlug } from './FAQ';

export interface FAQRepository {
	getFAQBySlug(slug: QuestionSlug): Promise<Either<Question.QuestionRéponse>>
	getAllFAQ(): Promise<Either<Array<Question>>>
	listAllFAQSlug(): Promise<Either<Array<string>>>
}

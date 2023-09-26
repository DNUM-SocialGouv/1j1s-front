import { Either } from '~/server/errors/either';
import { FAQRepository } from '~/server/faq/domain/FAQ.repository';

import { Question, QuestionSlug } from '../domain/FAQ';

export class ConsulterFAQUseCase {
	constructor(private faqRepository: FAQRepository) {}

	async handle(slug: QuestionSlug): Promise<Either<Question.QuestionRéponse>> {
		return this.faqRepository.getFAQBySlug(slug);
	}
}

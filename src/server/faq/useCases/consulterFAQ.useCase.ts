import { Either } from '~/server/errors/either';
import { FAQQuestionEtReponse, FAQSlug } from '~/server/faq/domain/FAQ';
import { FAQRepository } from '~/server/faq/domain/FAQ.repository';

export class ConsulterFAQUseCase {
	constructor(private faqRepository: FAQRepository) {}

	async handle(slug: FAQSlug): Promise<Either<FAQQuestionEtReponse>> {
		return this.faqRepository.getFAQBySlug(slug);
	}
}

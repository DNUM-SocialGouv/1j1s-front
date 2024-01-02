import { Either } from '~/server/errors/either';
import { FAQ } from '~/server/faq/domain/FAQ';
import { FAQRepository } from '~/server/faq/domain/FAQ.repository';

export class ConsulterFAQUseCase {
	constructor(private faqRepository: FAQRepository) {}

	async handle(slug: FAQ.Slug): Promise<Either<FAQ.QuestionEtReponse>> {
		return this.faqRepository.getFAQBySlug(slug);
	}
}

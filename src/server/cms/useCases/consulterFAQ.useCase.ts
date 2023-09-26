import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { Either } from '~/server/errors/either';
import { Question, QuestionSlug } from '~/server/faq/domain/FAQ';

export class ConsulterFAQUseCase {
	constructor(private cmsRepository: CmsRepository) {}

	async handle(slug: QuestionSlug): Promise<Either<Question.QuestionRéponse>> {
		return this.cmsRepository.getFAQBySlug(slug);
	}
}

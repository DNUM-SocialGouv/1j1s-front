import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { Question, QuestionSlug } from '~/server/cms/domain/FAQ.type';
import { Either } from '~/server/errors/either';

export class ConsulterFAQUseCase {
	constructor(private cmsRepository: CmsRepository) {}

	async handle(slug: QuestionSlug): Promise<Either<Question.QuestionRéponse>> {
		return this.cmsRepository.getFAQBySlug(slug);
	}
}
